"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  formatPercentage,
  ON_FIRE_STREAK,
  PERSONAL_STATS_STORAGE_KEY,
  parsePersonalStats,
  recordPersonalShot,
  type PersonalStats,
} from "@/lib/nba/personal-stats";
import {
  clampAngle,
  DEFAULT_SHOT_ANGLE_IN_DEGREES,
  getDragVelocity,
  getKeyboardVelocity,
  getShotGeometry,
  isShootableSpeed,
  isShotOver,
  launchBall,
  stepBall,
  type Ball,
  type Velocity,
} from "@/lib/nba/shot-physics";
import { drawScene, RESULT_MESSAGE_FRAMES, type SceneState } from "@/lib/nba/shot-renderer";
import type { ShotTotals } from "@/lib/nba/shot-stats";

export type ShotGameLabels = {
  title: string;
  hint: string;
  onFireHint: string;
  you: string;
  streak: string;
  best: string;
  allVisitors: string;
  canvasDescription: string;
  firstTimeHint: string;
  /** Contains `{angle}`. */
  keyboardAim: string;
  swish: string;
  bucket: string;
  onFire: string;
};

const KEYBOARD_ANGLE_STEP_IN_DEGREES = 2;
const POINTER_GRAB_RADIUS_IN_PIXELS = 70;
const NET_DECAY_PER_FRAME = 0.95;
const MAX_DEVICE_PIXEL_RATIO = 2;
const MILLISECONDS_PER_SECOND = 1000;
const SHOT_KEYS = new Set([" ", "Enter"]);

type GameRuntime = {
  ball: Ball | null;
  pointer: { x: number; y: number } | null;
  keyboardHoldStart: number | null;
  keyboardAngle: number;
  netEnergy: number;
  message: { text: string; framesLeft: number } | null;
  seconds: number;
  hasShot: boolean;
  wasScoredThisShot: boolean;
};

function readFontFamily(element: HTMLElement, variableName: string, fallback: string): string {
  const resolved = getComputedStyle(element).getPropertyValue(variableName).trim();
  return resolved ? `${resolved}, ${fallback}` : fallback;
}

function formatTotals(totals: ShotTotals | null): string {
  if (!totals) return "-";
  const percentage = formatPercentage(totals.makes, totals.shots);
  return `${totals.makes.toLocaleString("en-US")}/${totals.shots.toLocaleString("en-US")} · ${percentage}%`;
}

export function ShotGame({ labels }: { labels: ShotGameLabels }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // This component only renders on the client (see shot-game-loader), so storage is readable here.
  const [storedStats] = useState(() =>
    parsePersonalStats(window.localStorage.getItem(PERSONAL_STATS_STORAGE_KEY)),
  );
  const runtimeRef = useRef<GameRuntime>({
    ball: null,
    pointer: null,
    keyboardHoldStart: null,
    keyboardAngle: DEFAULT_SHOT_ANGLE_IN_DEGREES,
    netEnergy: 0,
    message: null,
    seconds: 0,
    hasShot: storedStats.shots > 0,
    wasScoredThisShot: false,
  });
  const personalStatsRef = useRef<PersonalStats>(storedStats);
  const labelsRef = useRef(labels);
  const [personalStats, setPersonalStats] = useState<PersonalStats>(storedStats);
  const [totals, setTotals] = useState<ShotTotals | null>(null);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    labelsRef.current = labels;
  }, [labels]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/nba/shots", { signal: controller.signal })
      .then((response) => (response.ok ? (response.json() as Promise<ShotTotals>) : null))
      .then((loaded) => loaded && setTotals(loaded))
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const finishShot = useCallback((made: boolean) => {
    const next = recordPersonalShot(personalStatsRef.current, made);
    personalStatsRef.current = next;
    setPersonalStats(next);
    try {
      window.localStorage.setItem(PERSONAL_STATS_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Private mode or full storage: stats just do not persist.
    }
    fetch("/api/nba/shots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ made }),
    })
      .then((response) => (response.ok ? (response.json() as Promise<ShotTotals>) : null))
      .then((updated) => updated && setTotals(updated))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const runtime = runtimeRef.current;

    const fonts = {
      display: readFontFamily(canvas, "--font-bricolage", "sans-serif"),
      mono: readFontFamily(canvas, "--font-jetbrains-mono", "monospace"),
    };

    function getGeometry() {
      return getShotGeometry(canvas!.clientWidth, canvas!.clientHeight);
    }

    function resizeCanvas() {
      const ratio = Math.min(MAX_DEVICE_PIXEL_RATIO, window.devicePixelRatio || 1);
      const width = Math.round(canvas!.clientWidth * ratio);
      const height = Math.round(canvas!.clientHeight * ratio);
      if (canvas!.width !== width || canvas!.height !== height) {
        canvas!.width = width;
        canvas!.height = height;
      }
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function getAimVelocity(): Velocity | null {
      if (runtime.pointer) return getDragVelocity(getGeometry(), runtime.pointer);
      if (runtime.keyboardHoldStart !== null) {
        const heldSeconds =
          (performance.now() - runtime.keyboardHoldStart) / MILLISECONDS_PER_SECOND;
        return getKeyboardVelocity(heldSeconds, runtime.keyboardAngle);
      }
      return null;
    }

    function shoot(velocity: Velocity) {
      if (runtime.ball || !isShootableSpeed(velocity)) return;
      runtime.ball = launchBall(getGeometry(), velocity);
      runtime.wasScoredThisShot = false;
      runtime.hasShot = true;
    }

    function handleScore(outcome: "swish" | "bucket") {
      const streakAfterMake = personalStatsRef.current.streak + 1;
      const text =
        streakAfterMake >= ON_FIRE_STREAK
          ? labelsRef.current.onFire
          : outcome === "bucket"
            ? labelsRef.current.bucket
            : labelsRef.current.swish;
      runtime.netEnergy = 1;
      runtime.message = { text, framesLeft: RESULT_MESSAGE_FRAMES };
      runtime.wasScoredThisShot = true;
      setAnnouncement(text);
    }

    function advanceFrame() {
      runtime.seconds += 1 / 60;
      runtime.netEnergy *= NET_DECAY_PER_FRAME;
      if (runtime.message && --runtime.message.framesLeft <= 0) runtime.message = null;

      const ball = runtime.ball;
      if (!ball) return;
      const geometry = getGeometry();
      const outcome = stepBall(ball, geometry);
      if (outcome) handleScore(outcome);
      if (isShotOver(ball, geometry)) {
        runtime.ball = null;
        finishShot(runtime.wasScoredThisShot);
      }
    }

    function render() {
      const geometry = getGeometry();
      const stats = personalStatsRef.current;
      const isAimingWithKeyboard = runtime.keyboardHoldStart !== null;
      const scene: SceneState = {
        ball: runtime.ball,
        aimVelocity: runtime.ball ? null : getAimVelocity(),
        keyboardAngleInDegrees: isAimingWithKeyboard ? runtime.keyboardAngle : null,
        isOnFire: stats.streak >= ON_FIRE_STREAK,
        netEnergy: runtime.netEnergy,
        message: runtime.message,
        showFirstTimeHint: !runtime.hasShot,
        seconds: runtime.seconds,
        fonts,
        labels: {
          firstTimeHint: labelsRef.current.firstTimeHint,
          keyboardAim: (angle) => labelsRef.current.keyboardAim.replace("{angle}", String(angle)),
        },
      };
      drawScene(context!, geometry, scene);
    }

    let animationFrame = 0;
    function loop() {
      resizeCanvas();
      advanceFrame();
      render();
      animationFrame = requestAnimationFrame(loop);
    }
    function start() {
      if (!animationFrame) animationFrame = requestAnimationFrame(loop);
    }
    function stop() {
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    }

    // Pause the loop while the canvas is offscreen or the tab is hidden.
    let isInViewport = false;
    function syncLoop() {
      if (isInViewport && !document.hidden) start();
      else stop();
    }
    const observer = new IntersectionObserver(([entry]) => {
      isInViewport = entry.isIntersecting;
      syncLoop();
    });
    observer.observe(canvas);
    document.addEventListener("visibilitychange", syncLoop);

    function toCanvasPoint(event: PointerEvent) {
      const bounds = canvas!.getBoundingClientRect();
      return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    }
    function onPointerDown(event: PointerEvent) {
      if (runtime.ball) return;
      const geometry = getGeometry();
      const point = toCanvasPoint(event);
      const distance = Math.hypot(point.x - geometry.startX, point.y - geometry.startY);
      if (distance > POINTER_GRAB_RADIUS_IN_PIXELS) return;
      runtime.pointer = point;
      canvas!.setPointerCapture(event.pointerId);
      canvas!.style.cursor = "grabbing";
    }
    function onPointerMove(event: PointerEvent) {
      if (runtime.pointer) runtime.pointer = toCanvasPoint(event);
    }
    function releasePointer(event: PointerEvent, shouldShoot: boolean) {
      if (!runtime.pointer) return;
      if (shouldShoot) shoot(getDragVelocity(getGeometry(), toCanvasPoint(event)));
      runtime.pointer = null;
      canvas!.style.cursor = "";
      if (canvas!.hasPointerCapture(event.pointerId))
        canvas!.releasePointerCapture(event.pointerId);
    }
    const onPointerUp = (event: PointerEvent) => releasePointer(event, true);
    const onPointerCancel = (event: PointerEvent) => releasePointer(event, false);

    function releaseKeyboardShot() {
      if (runtime.keyboardHoldStart === null) return;
      const velocity = getAimVelocity();
      runtime.keyboardHoldStart = null;
      if (velocity) shoot(velocity);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        const direction = event.key === "ArrowUp" ? 1 : -1;
        runtime.keyboardAngle = clampAngle(
          runtime.keyboardAngle + direction * KEYBOARD_ANGLE_STEP_IN_DEGREES,
        );
        event.preventDefault();
      } else if (SHOT_KEYS.has(event.key)) {
        event.preventDefault();
        if (!event.repeat && !runtime.ball && runtime.keyboardHoldStart === null) {
          runtime.keyboardHoldStart = performance.now();
        }
      }
    }
    function onKeyUp(event: KeyboardEvent) {
      if (!SHOT_KEYS.has(event.key)) return;
      event.preventDefault();
      releaseKeyboardShot();
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerCancel);
    canvas.addEventListener("keydown", onKeyDown);
    canvas.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("blur", releaseKeyboardShot);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncLoop);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerCancel);
      canvas.removeEventListener("keydown", onKeyDown);
      canvas.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("blur", releaseKeyboardShot);
    };
  }, [finishShot]);

  const isOnFire = personalStats.streak >= ON_FIRE_STREAK;
  const statCells = [
    { label: labels.you, value: `${personalStats.makes}/${personalStats.shots}`, isAccent: true },
    { label: labels.streak, value: String(personalStats.streak), isAccent: false },
    { label: labels.best, value: String(personalStats.best), isAccent: false },
    { label: labels.allVisitors, value: formatTotals(totals), isAccent: false },
  ];

  return (
    <div className="reveal min-w-0 flex-[999_1_560px] overflow-hidden rounded-xl border border-line-strong bg-bg-sunken shadow-3">
      <div className="flex flex-wrap border-b border-line bg-(image:--stage-gradient)">
        <div className="flex flex-[2_1_200px] flex-col justify-center gap-0.5 px-5 py-3">
          <span className="flex items-center gap-2 text-body font-semibold">
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2v20M2 12h20M4.9 4.9c3.1 3.1 3.1 11.1 0 14.2M19.1 4.9c-3.1 3.1-3.1 11.1 0 14.2" />
            </svg>
            {labels.title}
          </span>
          <span className="text-small text-text-muted">
            {isOnFire ? labels.onFireHint : labels.hint}
          </span>
        </div>
        {statCells.map((cell) => (
          <div
            key={cell.label}
            className="flex flex-[1_1_90px] flex-col justify-center gap-0.5 border-l border-line px-[18px] py-3"
          >
            <span className="font-mono text-micro tracking-[0.12em] text-text-faint uppercase">
              {cell.label}
            </span>
            <span
              className={`font-mono text-[22px] leading-[1.1] font-medium ${
                cell.isAccent ? "text-accent [text-shadow:0_0_14px_var(--accent)]" : "text-text"
              }`}
            >
              {cell.value}
            </span>
          </div>
        ))}
      </div>
      {/* A canvas has no img equivalent; the role plus label is the required description. */}
      <canvas
        ref={canvasRef}
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
        role="img"
        aria-label={labels.canvasDescription}
        tabIndex={0}
        className="block h-[400px] w-full cursor-grab touch-none -outline-offset-3"
      />
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}
