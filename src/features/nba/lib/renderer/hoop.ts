import { palette } from "@/lib/palette";
import type { ShotGeometry } from "../shot-physics";

const NET_RING_COUNT = 4;
const NET_POINTS_PER_RING = 12;

export function drawRim(
  ctx: CanvasRenderingContext2D,
  geometry: ShotGeometry,
  half: "back" | "front",
) {
  const { hoopX, rimY, halfRim } = geometry;
  ctx.lineCap = "round";
  ctx.beginPath();
  if (half === "back") {
    ctx.strokeStyle = "#b4461c";
    ctx.lineWidth = 3.5;
    ctx.ellipse(hoopX, rimY, halfRim + 3, 7, 0, Math.PI, Math.PI * 2);
    ctx.stroke();
    return;
  }
  ctx.strokeStyle = palette.accent;
  ctx.lineWidth = 4;
  ctx.ellipse(hoopX, rimY, halfRim + 3, 7, 0, 0, Math.PI);
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,.35)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(hoopX, rimY - 1, halfRim + 3, 7, 0, 0.3, Math.PI - 0.3);
  ctx.stroke();
}

function getNetPoint(
  geometry: ShotGeometry,
  ring: number,
  point: number,
  stretch: number,
  sway: number,
  seconds: number,
) {
  const depth = ring / (NET_RING_COUNT - 1);
  const radiusX = (geometry.halfRim + 3) * (1 - depth * 0.42);
  const radiusY = 7 * (1 - depth * 0.4);
  const offset = Math.round(depth * 3) % 2 ? 0.5 : 0;
  const angle = ((point + offset) / NET_POINTS_PER_RING) * Math.PI * 2;
  return {
    x:
      geometry.hoopX + Math.cos(angle) * radiusX + Math.sin(seconds * 9 + point) * sway * depth * 5,
    y: geometry.rimY + 50 * stretch * depth + Math.sin(angle) * radiusY,
    isFront: Math.sin(angle) > 0,
  };
}

export function drawNet(
  ctx: CanvasRenderingContext2D,
  geometry: ShotGeometry,
  netEnergy: number,
  seconds: number,
  pass: "back" | "front",
) {
  const stretch = 1 + netEnergy * 0.45;
  const wantsFront = pass === "front";
  ctx.lineWidth = 1.2;
  ctx.lineCap = "butt";
  ctx.strokeStyle = wantsFront ? "rgba(245,245,240,.85)" : "rgba(200,200,195,.35)";
  for (let ring = 0; ring < NET_RING_COUNT - 1; ring += 1) {
    for (let point = 0; point < NET_POINTS_PER_RING; point += 1) {
      const from = getNetPoint(geometry, ring, point, stretch, netEnergy, seconds);
      const neighbour = (point + (ring % 2 ? 1 : NET_POINTS_PER_RING - 1)) % NET_POINTS_PER_RING;
      for (const targetPoint of [point, neighbour]) {
        const to = getNetPoint(geometry, ring + 1, targetPoint, stretch, netEnergy, seconds);
        if (from.isFront === wantsFront || to.isFront === wantsFront) {
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.stroke();
        }
      }
    }
  }
}
