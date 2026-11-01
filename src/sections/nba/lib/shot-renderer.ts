import { palette, withAlpha } from "@/lib/palette";
import { MAX_SHOT_SPEED, type Ball, type ShotGeometry, type Velocity } from "./shot-physics";

/** Canvas 2D drawing for the shot game. Brand colours come from the shared palette; the court scene colours are local art. */
const GRAVITY_FOR_GUIDE = 0.35;
const GUIDE_STEPS = 44;
const MESSAGE_FRAMES = 80;
const NET_RING_COUNT = 4;
const NET_POINTS_PER_RING = 12;

export const RESULT_MESSAGE_FRAMES = MESSAGE_FRAMES;

export type SceneState = {
  ball: Ball | null;
  /** Aim preview while dragging or holding a key; null otherwise. */
  aimVelocity: Velocity | null;
  keyboardAngleInDegrees: number | null;
  isOnFire: boolean;
  netEnergy: number;
  message: { text: string; framesLeft: number } | null;
  seconds: number;
  /** Resolved CSS font-family values; canvas text cannot read CSS variables. */
  fonts: { display: string; mono: string };
  labels: { keyboardAim: (angle: number) => string };
};

const BOKEH: [number, number, number, string][] = [
  [0.08, 0.18, 26, withAlpha(palette.accent, 0.07)],
  [0.22, 0.32, 18, "rgba(255,255,255,.05)"],
  [0.35, 0.12, 30, "rgba(255,138,61,.06)"],
  [0.5, 0.28, 16, "rgba(255,255,255,.05)"],
  [0.6, 0.1, 22, "rgba(255,194,122,.06)"],
  [0.15, 0.5, 14, "rgba(255,255,255,.04)"],
  [0.44, 0.48, 20, withAlpha(palette.accent, 0.05)],
];

function drawBackdrop(ctx: CanvasRenderingContext2D, g: ShotGeometry) {
  const sky = ctx.createLinearGradient(0, 0, 0, g.floorY);
  sky.addColorStop(0, "#09090c");
  sky.addColorStop(1, "#16161c");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, g.width, g.height);

  const spot = ctx.createRadialGradient(g.hoopX, -60, 10, g.hoopX, -60, g.height * 1.3);
  spot.addColorStop(0, "rgba(255,236,210,.14)");
  spot.addColorStop(1, "rgba(255,236,210,0)");
  ctx.fillStyle = spot;
  ctx.fillRect(0, 0, g.width, g.floorY);

  for (const [xFraction, yFraction, radius, color] of BOKEH) {
    const x = g.width * xFraction;
    const y = g.floorY * yFraction;
    const blob = ctx.createRadialGradient(x, y, 0, x, y, radius);
    blob.addColorStop(0, color);
    blob.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = blob;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawFloor(ctx: CanvasRenderingContext2D, g: ShotGeometry) {
  const wood = ctx.createLinearGradient(0, g.floorY, 0, g.height);
  wood.addColorStop(0, "#7a4e2c");
  wood.addColorStop(1, "#3a2414");
  ctx.fillStyle = wood;
  ctx.fillRect(0, g.floorY, g.width, g.height - g.floorY);

  ctx.strokeStyle = "rgba(0,0,0,.22)";
  ctx.lineWidth = 1;
  let boardY = g.floorY;
  let boardGap = 4;
  while (boardY < g.height) {
    ctx.beginPath();
    ctx.moveTo(0, boardY);
    ctx.lineTo(g.width, boardY);
    ctx.stroke();
    boardY += boardGap;
    boardGap *= 1.35;
  }
  for (let seamX = -40; seamX < g.width; seamX += 90) {
    ctx.beginPath();
    ctx.moveTo(seamX + 20, g.floorY);
    ctx.lineTo(seamX - 30, g.height);
    ctx.stroke();
  }

  ctx.fillStyle = withAlpha(palette.accent, 0.28);
  ctx.fillRect(g.hoopX - 120, g.floorY, g.boardX + 60 - (g.hoopX - 120), g.height - g.floorY);
  ctx.fillStyle = "rgba(255,255,255,.75)";
  ctx.fillRect(g.hoopX - 122, g.floorY, 3, g.height - g.floorY);

  const sheen = ctx.createLinearGradient(0, g.floorY, 0, g.floorY + 16);
  sheen.addColorStop(0, "rgba(255,230,200,.18)");
  sheen.addColorStop(1, "rgba(255,230,200,0)");
  ctx.fillStyle = sheen;
  ctx.fillRect(0, g.floorY, g.width, 16);
}

function drawStanchion(ctx: CanvasRenderingContext2D, g: ShotGeometry) {
  const poleX = g.boardX + 70;
  const padWidth = 64;
  const padHeight = 58;
  const padY = g.floorY - padHeight;

  const pole = ctx.createLinearGradient(poleX - 8, 0, poleX + 8, 0);
  pole.addColorStop(0, "#4a4a55");
  pole.addColorStop(0.5, "#8c8c98");
  pole.addColorStop(1, "#3a3a44");
  ctx.fillStyle = pole;
  ctx.fillRect(poleX - 8, g.rimY - 72, 16, padY - (g.rimY - 72) + 4);
  ctx.fillRect(g.boardX - 4, g.rimY - 66, poleX - g.boardX + 4, 10);

  ctx.save();
  ctx.translate(g.boardX + 18, g.rimY - 56);
  ctx.rotate(Math.atan2(46, poleX - g.boardX - 18));
  ctx.fillRect(0, -3, Math.hypot(46, poleX - g.boardX - 18), 6);
  ctx.restore();

  ctx.fillStyle = "rgba(0,0,0,.35)";
  ctx.beginPath();
  ctx.ellipse(poleX, g.floorY + 3, padWidth / 2 + 6, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  const left = poleX - padWidth / 2;
  const padFill = ctx.createLinearGradient(0, padY, 0, g.floorY);
  padFill.addColorStop(0, "#3a3a46");
  padFill.addColorStop(1, "#24242c");
  ctx.fillStyle = padFill;
  ctx.beginPath();
  ctx.moveTo(left, g.floorY);
  ctx.lineTo(left, padY + 8);
  ctx.quadraticCurveTo(left, padY, left + 8, padY);
  ctx.lineTo(left + padWidth - 8, padY);
  ctx.quadraticCurveTo(left + padWidth, padY, left + padWidth, padY + 8);
  ctx.lineTo(left + padWidth, g.floorY);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = palette.accent;
  ctx.fillRect(left, padY + 16, padWidth, 7);
  ctx.fillStyle = "rgba(255,255,255,.08)";
  ctx.fillRect(left + 4, padY + 3, padWidth - 8, 3);
}

function drawBackboard(ctx: CanvasRenderingContext2D, g: ShotGeometry) {
  const boardWidth = 116;
  const boardHeight = 80;
  const left = g.hoopX - boardWidth / 2 + 10;
  const top = g.rimY - 66;

  const glass = ctx.createLinearGradient(left, top, left + boardWidth, top + boardHeight);
  glass.addColorStop(0, "rgba(200,220,255,.16)");
  glass.addColorStop(0.5, "rgba(255,255,255,.05)");
  glass.addColorStop(1, "rgba(200,220,255,.12)");
  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(left + boardWidth, top - 6);
  ctx.lineTo(left + boardWidth, top + boardHeight - 6);
  ctx.lineTo(left, top + boardHeight);
  ctx.closePath();
  ctx.fillStyle = glass;
  ctx.fill();
  ctx.strokeStyle = "#f2f2ee";
  ctx.lineWidth = 3;
  ctx.stroke();

  const targetX = g.hoopX - 18 + 10;
  const targetY = g.rimY - 30;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(targetX, targetY);
  ctx.lineTo(targetX + 40, targetY - 2);
  ctx.lineTo(targetX + 40, targetY + 26);
  ctx.moveTo(targetX, targetY);
  ctx.lineTo(targetX, targetY + 28);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,255,255,.22)";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(left + 14, top + boardHeight - 10);
  ctx.lineTo(left + 40, top + 8);
  ctx.stroke();

  const bracketX = left + boardWidth * 0.5 + 8;
  ctx.fillStyle = "#3a3a44";
  ctx.beginPath();
  ctx.moveTo(bracketX - 10, g.rimY - 16);
  ctx.lineTo(bracketX + 6, g.rimY - 17);
  ctx.lineTo(g.hoopX + g.halfRim + 2, g.rimY + 1);
  ctx.lineTo(g.hoopX + 4, g.rimY + 1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#2a2a32";
  ctx.fillRect(bracketX - 10, g.rimY - 20, 16, 6);
}

function drawRim(ctx: CanvasRenderingContext2D, g: ShotGeometry, half: "back" | "front") {
  ctx.lineCap = "round";
  ctx.beginPath();
  if (half === "back") {
    ctx.strokeStyle = "#b4461c";
    ctx.lineWidth = 3.5;
    ctx.ellipse(g.hoopX, g.rimY, g.halfRim + 3, 7, 0, Math.PI, Math.PI * 2);
    ctx.stroke();
    return;
  }
  ctx.strokeStyle = palette.accent;
  ctx.lineWidth = 4;
  ctx.ellipse(g.hoopX, g.rimY, g.halfRim + 3, 7, 0, 0, Math.PI);
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,.35)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.ellipse(g.hoopX, g.rimY - 1, g.halfRim + 3, 7, 0, 0.3, Math.PI - 0.3);
  ctx.stroke();
}

function getNetPoint(
  g: ShotGeometry,
  ring: number,
  point: number,
  stretch: number,
  sway: number,
  seconds: number,
) {
  const t = ring / (NET_RING_COUNT - 1);
  const radiusX = (g.halfRim + 3) * (1 - t * 0.42);
  const radiusY = 7 * (1 - t * 0.4);
  const offset = Math.round(t * 3) % 2 ? 0.5 : 0;
  const angle = ((point + offset) / NET_POINTS_PER_RING) * Math.PI * 2;
  return {
    x: g.hoopX + Math.cos(angle) * radiusX + Math.sin(seconds * 9 + point) * sway * t * 5,
    y: g.rimY + 50 * stretch * t + Math.sin(angle) * radiusY,
    isFront: Math.sin(angle) > 0,
  };
}

function drawNet(
  ctx: CanvasRenderingContext2D,
  g: ShotGeometry,
  netEnergy: number,
  seconds: number,
  pass: "back" | "front",
) {
  const stretch = 1 + netEnergy * 0.45;
  ctx.lineWidth = 1.2;
  ctx.lineCap = "butt";
  ctx.strokeStyle = pass === "front" ? "rgba(245,245,240,.85)" : "rgba(200,200,195,.35)";
  const wantsFront = pass === "front";
  for (let ring = 0; ring < NET_RING_COUNT - 1; ring += 1) {
    for (let point = 0; point < NET_POINTS_PER_RING; point += 1) {
      const from = getNetPoint(g, ring, point, stretch, netEnergy, seconds);
      const neighbour = (point + (ring % 2 ? 1 : NET_POINTS_PER_RING - 1)) % NET_POINTS_PER_RING;
      for (const targetPoint of [point, neighbour]) {
        const to = getNetPoint(g, ring + 1, targetPoint, stretch, netEnergy, seconds);
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

function drawTrail(ctx: CanvasRenderingContext2D, g: ShotGeometry, ball: Ball, isOnFire: boolean) {
  const length = ball.trail.length;
  ball.trail.forEach((point, index) => {
    const alpha = (index + 1) / length;
    ctx.fillStyle = isOnFire
      ? `rgba(255,${Math.round(80 + 100 * alpha)},40,${0.5 * alpha})`
      : `rgba(255,255,255,${alpha * 0.08})`;
    const radius = g.ballRadius * (isOnFire ? 0.5 + 0.7 * alpha : 0.4 + 0.5 * alpha);
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawAimGuide(ctx: CanvasRenderingContext2D, g: ShotGeometry, velocity: Velocity) {
  let x = g.startX;
  let y = g.startY;
  let vy = velocity.vy;
  for (let step = 0; step < GUIDE_STEPS; step += 1) {
    vy += GRAVITY_FOR_GUIDE;
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
  ctx.arc(g.startX, g.startY, g.ballRadius + 8, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * power);
  ctx.stroke();
}

function drawBall(
  ctx: CanvasRenderingContext2D,
  g: ShotGeometry,
  x: number,
  y: number,
  rotation: number,
  isOnFire: boolean,
) {
  const radius = g.ballRadius;
  const height = Math.max(0, g.floorY - (y + radius));
  ctx.fillStyle = `rgba(0,0,0,${0.45 * (1 - Math.min(0.8, height / 300))})`;
  ctx.beginPath();
  ctx.ellipse(x, g.floorY + 3, radius * (1 - Math.min(0.5, height / 400)), 4, 0, 0, Math.PI * 2);
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

  const specular = ctx.createRadialGradient(
    -radius * 0.4,
    -radius * 0.45,
    0,
    -radius * 0.4,
    -radius * 0.45,
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

function drawMessage(
  ctx: CanvasRenderingContext2D,
  g: ShotGeometry,
  message: NonNullable<SceneState["message"]>,
  fonts: SceneState["fonts"],
) {
  const elapsed = MESSAGE_FRAMES - message.framesLeft;
  ctx.save();
  ctx.globalAlpha = Math.min(1, message.framesLeft / 20);
  ctx.font = `800 ${Math.round(44 + elapsed * 0.25)}px ${fonts.display}`;
  ctx.textAlign = "center";
  const fill = ctx.createLinearGradient(g.hoopX - 260, 0, g.hoopX, 0);
  fill.addColorStop(0, "#ffffff");
  fill.addColorStop(1, palette.accent);
  ctx.fillStyle = fill;
  ctx.fillText(message.text, Math.max(140, g.hoopX - 220), g.rimY - 40 - elapsed * 0.5);
  ctx.restore();
}

function drawHints(ctx: CanvasRenderingContext2D, g: ShotGeometry, scene: SceneState) {
  ctx.font = `500 12px ${scene.fonts.mono}`;
  ctx.fillStyle = palette.textSecondary;
  ctx.textAlign = "left";
  if (scene.keyboardAngleInDegrees !== null) {
    const labelY = g.startY + 46 > g.floorY + 40 ? g.startY - 36 : g.startY + 46;
    ctx.fillText(scene.labels.keyboardAim(scene.keyboardAngleInDegrees), g.startX - 40, labelY);
  }
}

export function drawScene(ctx: CanvasRenderingContext2D, g: ShotGeometry, scene: SceneState) {
  ctx.clearRect(0, 0, g.width, g.height);
  drawBackdrop(ctx, g);
  drawFloor(ctx, g);
  drawStanchion(ctx, g);
  drawBackboard(ctx, g);
  drawRim(ctx, g, "back");
  drawNet(ctx, g, scene.netEnergy, scene.seconds, "back");

  const ball = scene.ball;
  if (ball) drawTrail(ctx, g, ball, scene.isOnFire);
  if (!ball && scene.aimVelocity) drawAimGuide(ctx, g, scene.aimVelocity);
  if (ball) {
    drawBall(ctx, g, ball.x, ball.y, ball.rotation, scene.isOnFire);
  } else {
    const bob = Math.sin(scene.seconds * 3) * 1.5;
    drawBall(ctx, g, g.startX, g.startY + bob, 0, scene.isOnFire);
  }

  drawNet(ctx, g, scene.netEnergy, scene.seconds, "front");
  drawRim(ctx, g, "front");
  if (scene.message) drawMessage(ctx, g, scene.message, scene.fonts);
  drawHints(ctx, g, scene);
}
