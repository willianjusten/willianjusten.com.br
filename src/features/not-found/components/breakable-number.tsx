"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createFixedStepper, reducedMotionQuery, runWhileVisible } from "@/lib/animation-loop";
import { fitCanvas, getCanvasPixelRatio } from "@/lib/canvas";
import { palette } from "@/lib/palette";
import {
  blast,
  BROKEN_SHARE,
  createParticleField,
  getBrokenShare,
  movePointer,
  PARTICLE_RADIUS_SHARE,
  rebuild,
  releasePointer,
  sampleGlyphPoints,
  SHADE_COUNT,
  stepParticleField,
  type ParticleField,
} from "../lib/particle-field";

export type BreakableNumberLabels = {
  canvasDescription: string;
  hint: string;
  touchHint: string;
  damage: string;
  broken: string;
  rebuild: string;
};

const NUMBER = "404";
const SHADES = [palette.accent, palette.accentHigh, palette.accentLow, palette.textSecondary];
/** The number fills this share of the canvas height, and no more than this share of its width. */
const NUMBER_HEIGHT_SHARE = 0.78;
const NUMBER_WIDTH_SHARE = 0.92;
/** Roughly 60 particles across the cap height keeps the count near 1500 on a desktop screen. */
const PARTICLES_ACROSS_CAP_HEIGHT = 60;
const MIN_PARTICLE_SPACING = 4;

function readFontFamily(element: HTMLElement): string {
  const resolved = getComputedStyle(element).getPropertyValue("--font-bricolage").trim();
  return resolved ? `${resolved}, sans-serif` : "sans-serif";
}

function layOutNumber(width: number, height: number, fontFamily: string) {
  const offscreen = document.createElement("canvas");
  offscreen.width = Math.max(1, Math.floor(width));
  offscreen.height = Math.max(1, Math.floor(height));
  const context = offscreen.getContext("2d", { willReadFrequently: true });
  if (!context) return { points: [], spacing: MIN_PARTICLE_SPACING };

  let fontSize = height * NUMBER_HEIGHT_SHARE;
  context.font = `800 ${fontSize}px ${fontFamily}`;
  const measuredWidth = context.measureText(NUMBER).width;
  if (measuredWidth > width * NUMBER_WIDTH_SHARE) {
    fontSize *= (width * NUMBER_WIDTH_SHARE) / measuredWidth;
    context.font = `800 ${fontSize}px ${fontFamily}`;
  }
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = palette.white;
  context.fillText(NUMBER, offscreen.width / 2, offscreen.height / 2);

  const spacing = Math.max(
    MIN_PARTICLE_SPACING,
    Math.round(fontSize / PARTICLES_ACROSS_CAP_HEIGHT),
  );
  const image = context.getImageData(0, 0, offscreen.width, offscreen.height);
  return { points: sampleGlyphPoints(image.data, image.width, image.height, spacing), spacing };
}

function drawField(context: CanvasRenderingContext2D, field: ParticleField, radius: number) {
  context.clearRect(0, 0, field.width, field.height);
  for (let shade = 0; shade < SHADE_COUNT; shade++) {
    context.fillStyle = SHADES[shade];
    context.beginPath();
    for (const particle of field.particles) {
      if (particle.shade !== shade) continue;
      context.moveTo(particle.x + radius, particle.y);
      context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
    }
    context.fill();
  }
}

export function BreakableNumber({ labels }: { labels: BreakableNumberLabels }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<ParticleField | null>(null);
  const [damagePercent, setDamagePercent] = useState(0);
  const isBroken = damagePercent >= BROKEN_SHARE * 100;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const motionQuery = reducedMotionQuery();
    let radius = MIN_PARTICLE_SPACING * PARTICLE_RADIUS_SHARE;
    let pixelRatio = 0;
    let shownPercent = 0;
    let isDisposed = false;

    const layOut = () => {
      const size = fitCanvas(canvas, context);
      pixelRatio = size.pixelRatio;
      const { points, spacing } = layOutNumber(size.width, size.height, readFontFamily(canvas));
      radius = spacing * PARTICLE_RADIUS_SHARE;
      fieldRef.current = createParticleField(points, size.width, size.height);
      drawField(context, fieldRef.current, radius);
    };

    const syncDamage = (field: ParticleField) => {
      const percent = Math.round(getBrokenShare(field) * 100);
      if (percent === shownPercent) return;
      shownPercent = percent;
      setDamagePercent(percent);
    };

    // The number is drawn from the display font, so the layout waits for it to load.
    void document.fonts.ready.then(() => {
      if (!isDisposed) layOut();
    });
    const resizeObserver = new ResizeObserver(() => {
      if (document.fonts.status === "loaded") layOut();
    });
    resizeObserver.observe(canvas);

    const stepFrame = createFixedStepper();
    const stopLoop = runWhileVisible(canvas, (elapsedInMilliseconds) => {
      const field = fieldRef.current;
      if (!field) return;
      // Moving the window to another screen changes the ratio without resizing the canvas.
      if (getCanvasPixelRatio() !== pixelRatio) layOut();
      for (let step = stepFrame(elapsedInMilliseconds); step > 0; step--) {
        stepParticleField(field, radius, motionQuery.matches);
      }
      drawField(context, field, radius);
      syncDamage(field);
    });

    const toCanvasPoint = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    };
    const handlePointerMove = (event: PointerEvent) => {
      const field = fieldRef.current;
      if (!field) return;
      const { x, y } = toCanvasPoint(event);
      movePointer(field, x, y);
    };
    const handlePointerDown = (event: PointerEvent) => {
      const field = fieldRef.current;
      if (!field) return;
      const { x, y } = toCanvasPoint(event);
      blast(field, x, y);
      // A tap has no hover before it, so the push starts from the tap point.
      if (event.pointerType !== "mouse") movePointer(field, x, y);
    };
    const handlePointerLeave = () => {
      if (fieldRef.current) releasePointer(fieldRef.current);
    };
    // A finger lifting is the touch version of the mouse leaving.
    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") handlePointerLeave();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      const field = fieldRef.current;
      if (!field || (event.key !== "Enter" && event.key !== " ")) return;
      event.preventDefault();
      const target = field.particles[Math.floor(Math.random() * field.particles.length)];
      if (target) blast(field, target.x, target.y);
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("pointercancel", handlePointerLeave);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("keydown", handleKeyDown);

    return () => {
      isDisposed = true;
      stopLoop();
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("pointercancel", handlePointerLeave);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleRebuild = () => {
    if (fieldRef.current) rebuild(fieldRef.current);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* A canvas has no img equivalent; the role plus label is the required description. */}
      <canvas
        ref={canvasRef}
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
        role="img"
        aria-label={labels.canvasDescription}
        tabIndex={0}
        className="block h-[clamp(200px,min(40vh,60vw),420px)] w-full cursor-crosshair touch-pan-y rounded-xl -outline-offset-3"
      />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <div className="flex min-w-56 flex-1 flex-col gap-2">
          <div className="flex items-baseline justify-between font-mono text-eyebrow text-text-muted">
            <span>{labels.damage}</span>
            <span className="text-text tabular-nums">{damagePercent}%</span>
          </div>
          <div
            aria-hidden="true"
            className="h-1.5 overflow-hidden rounded-pill border border-line bg-surface"
          >
            <div
              className="h-full origin-left rounded-pill bg-(image:--ball-light) transition-transform duration-(--dur-fast)"
              style={{ transform: `scaleX(${damagePercent / 100})` }}
            />
          </div>
          <p aria-live="polite" className="m-0 text-small text-text-2">
            {isBroken ? (
              labels.broken
            ) : (
              <>
                <span className="pointer-coarse:hidden">{labels.hint}</span>
                <span className="hidden pointer-coarse:inline">{labels.touchHint}</span>
              </>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={handleRebuild}
          disabled={damagePercent === 0}
          className="pill-outline flex min-h-12 items-center gap-2.5 bg-glass-chip px-5 font-medium text-text disabled:opacity-40"
        >
          <RotateCcw size={16} strokeWidth={1.8} aria-hidden="true" />
          {labels.rebuild}
        </button>
      </div>
    </div>
  );
}
