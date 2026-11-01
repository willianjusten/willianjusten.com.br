import { palette, withAlpha } from "@/lib/palette";
import {
  GRAVITY_PER_FRAME,
  MAX_SHOT_SPEED,
  type Ball,
  type ShotGeometry,
  type Velocity,
} from "../shot-physics";

const GUIDE_STEPS = 44;

export function drawTrail(
  ctx: CanvasRenderingContext2D,
  geometry: ShotGeometry,
  ball: Ball,
  isOnFire: boolean,
) {
  const length = ball.trail.length;
  ball.trail.forEach((point, index) => {
    const alpha = (index + 1) / length;
    ctx.fillStyle = isOnFire
      ? `rgba(255,${Math.round(80 + 100 * alpha)},40,${0.5 * alpha})`
      : `rgba(255,255,255,${alpha * 0.08})`;
    const radius = geometry.ballRadius * (isOnFire ? 0.5 + 0.7 * alpha : 0.4 + 0.5 * alpha);
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

export function drawAimGuide(
  ctx: CanvasRenderingContext2D,
  geometry: ShotGeometry,
  velocity: Velocity,
) {
  const { startX, startY, ballRadius } = geometry;
  let x = startX;
  let y = startY;
  let vy = velocity.vy;
  for (let step = 0; step < GUIDE_STEPS; step += 1) {
    vy += GRAVITY_PER_FRAME;
    x += velocity.vx;
    y += vy;
    if (step % 2 === 1) {
      ctx.fillStyle = withAlpha(palette.text, 0.55);
      ctx.beginPath();
      ctx.arc(x, y, 2.4 * (1 - step / 56), 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const power = Math.min(1, Math.hypot(velocity.vx, velocity.vy) / MAX_SHOT_SPEED);
  ctx.strokeStyle = palette.accent;
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(startX, startY, ballRadius + 8, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * power);
  ctx.stroke();
}

export type BallPose = { x: number; y: number; rotation: number };

export function drawBall(
  ctx: CanvasRenderingContext2D,
  geometry: ShotGeometry,
  { x, y, rotation }: BallPose,
  isOnFire: boolean,
) {
  const { ballRadius: radius, floorY } = geometry;
  const height = Math.max(0, floorY - (y + radius));
  ctx.fillStyle = `rgba(0,0,0,${0.45 * (1 - Math.min(0.8, height / 300))})`;
  ctx.beginPath();
  ctx.ellipse(x, floorY + 3, radius * (1 - Math.min(0.5, height / 400)), 4, 0, 0, Math.PI * 2);
  ctx.fill();

  if (isOnFire) {
    const glow = ctx.createRadialGradient(x, y, radius * 0.6, x, y, radius * 2.6);
    glow.addColorStop(0, "rgba(255,140,40,.55)");
    glow.addColorStop(1, "rgba(255,138,61,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, radius * 2.6, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  ctx.translate(x, y);
  const body = ctx.createRadialGradient(-radius * 0.35, -radius * 0.4, radius * 0.1, 0, 0, radius);
  body.addColorStop(0, "#ffb27a");
  body.addColorStop(0.55, "#e2662a");
  body.addColorStop(1, "#8e3510");
  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.clip();
  ctx.rotate(rotation);
  ctx.strokeStyle = "rgba(30,12,4,.85)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-radius, 0);
  ctx.lineTo(radius, 0);
  ctx.moveTo(0, -radius);
  ctx.lineTo(0, radius);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(-radius * 1.3, 0, radius, -0.95, 0.95);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(radius * 1.3, 0, radius, Math.PI - 0.95, Math.PI + 0.95);
  ctx.stroke();
  ctx.restore();

  const specularX = -radius * 0.4;
  const specularY = -radius * 0.45;
  const specular = ctx.createRadialGradient(
    specularX,
    specularY,
    0,
    specularX,
    specularY,
    radius * 0.6,
  );
  specular.addColorStop(0, "rgba(255,255,255,.35)");
  specular.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = specular;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
