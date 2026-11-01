import { withAlpha } from "@/lib/palette";
import type { GlobeView } from "./globe-math";
import type { LandDots } from "./land-dots";

/** Read from the CSS tokens once per mount, since a canvas cannot use CSS variables. */
export type GlobeColors = {
  accent: string;
  dot: string;
  bodyHighlight: string;
  bodyShade: string;
};

export type GlobeFrame = {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  radius: number;
};

const MAX_PIXEL_RATIO = 2;

export function readGlobeColors(): GlobeColors {
  const styles = getComputedStyle(document.documentElement);
  return {
    accent: styles.getPropertyValue("--accent"),
    dot: styles.getPropertyValue("--text-faint"),
    bodyHighlight: styles.getPropertyValue("--surface-raised"),
    bodyShade: styles.getPropertyValue("--bg-sunken"),
  };
}

/** Sizes the backing store to the element at up to 2x density. Returns the size in CSS pixels. */
export function fitCanvas(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.round(width * pixelRatio);
  canvas.height = Math.round(height * pixelRatio);
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  return { width, height };
}

/** The halo is skipped once the globe is zoomed well past the stage, where it would never show. */
const HALO_VISIBLE_RADIUS_RATIO = 1.2;
const HALO_INNER_RATIO = 0.9;
const HALO_OUTER_RATIO = 1.28;
/** Land dots below this size are drawn as squares, which are far cheaper than arcs. */
const SQUARE_DOT_MAX_SIZE = 4;

function drawHalo(context: CanvasRenderingContext2D, frame: GlobeFrame, accent: string) {
  const { centerX, centerY, radius } = frame;
  const halo = context.createRadialGradient(
    centerX,
    centerY,
    radius * HALO_INNER_RATIO,
    centerX,
    centerY,
    radius * HALO_OUTER_RATIO,
  );
  halo.addColorStop(0, withAlpha(accent, 0.18));
  halo.addColorStop(0.45, withAlpha(accent, 0.06));
  halo.addColorStop(1, withAlpha(accent, 0));
  context.fillStyle = halo;
  context.beginPath();
  context.arc(centerX, centerY, radius * HALO_OUTER_RATIO, 0, Math.PI * 2);
  context.fill();
}

function drawBody(context: CanvasRenderingContext2D, frame: GlobeFrame, colors: GlobeColors) {
  const { centerX, centerY, radius } = frame;
  const body = context.createRadialGradient(
    centerX - radius * 0.35,
    centerY - radius * 0.4,
    radius * 0.1,
    centerX,
    centerY,
    radius,
  );
  body.addColorStop(0, colors.bodyHighlight);
  body.addColorStop(1, colors.bodyShade);
  context.fillStyle = body;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, Math.PI * 2);
  context.fill();
}

/** Projects every land dot on the visible hemisphere; nearer dots are larger and more opaque. */
function drawLandDots(
  context: CanvasRenderingContext2D,
  frame: GlobeFrame,
  view: GlobeView,
  landDots: LandDots,
  dotColor: string,
) {
  const { width, height, centerX, centerY, radius } = frame;
  const yaw = (view.lon * Math.PI) / 180;
  const pitch = (view.lat * Math.PI) / 180;
  const cosPitch = Math.cos(pitch);
  const sinPitch = Math.sin(pitch);
  const baseDotSize = Math.max(1.3, radius * 0.0068);
  context.fillStyle = dotColor;
  for (let index = 0; index < landDots.count; index++) {
    const longitudeOffset = landDots.lonRadians[index] - yaw;
    const right = landDots.cosLat[index] * Math.sin(longitudeOffset);
    const up = landDots.sinLat[index];
    const toward = landDots.cosLat[index] * Math.cos(longitudeOffset);
    const depth = up * sinPitch + toward * cosPitch;
    if (depth <= 0) continue;
    const screenX = centerX + right * radius;
    const screenY = centerY - (up * cosPitch - toward * sinPitch) * radius;
    if (
      screenX < -baseDotSize ||
      screenX > width + baseDotSize ||
      screenY < -baseDotSize ||
      screenY > height + baseDotSize
    ) {
      continue;
    }
    context.globalAlpha = 0.18 + 0.82 * depth;
    const dotSize = baseDotSize * (0.55 + 0.45 * depth);
    if (dotSize < SQUARE_DOT_MAX_SIZE) {
      context.fillRect(screenX - dotSize / 2, screenY - dotSize / 2, dotSize, dotSize);
    } else {
      context.beginPath();
      context.arc(screenX, screenY, dotSize / 2, 0, Math.PI * 2);
      context.fill();
    }
  }
  context.globalAlpha = 1;
}

/** One frame of the dotted globe: accent halo, shaded body, then the land dots. */
export function drawGlobe(
  context: CanvasRenderingContext2D,
  frame: GlobeFrame,
  view: GlobeView,
  landDots: LandDots,
  colors: GlobeColors,
) {
  context.clearRect(0, 0, frame.width, frame.height);
  if (frame.radius < Math.max(frame.width, frame.height) * HALO_VISIBLE_RADIUS_RATIO) {
    drawHalo(context, frame, colors.accent);
  }
  drawBody(context, frame, colors);
  drawLandDots(context, frame, view, landDots, colors.dot);
}
