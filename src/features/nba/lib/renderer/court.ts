import { palette, withAlpha } from "@/lib/palette";
import type { ShotGeometry } from "../shot-physics";

const BOKEH = [
  { xFraction: 0.08, yFraction: 0.18, radius: 26, color: withAlpha(palette.accent, 0.07) },
  { xFraction: 0.22, yFraction: 0.32, radius: 18, color: "rgba(255,255,255,.05)" },
  { xFraction: 0.35, yFraction: 0.12, radius: 30, color: "rgba(255,138,61,.06)" },
  { xFraction: 0.5, yFraction: 0.28, radius: 16, color: "rgba(255,255,255,.05)" },
  { xFraction: 0.6, yFraction: 0.1, radius: 22, color: "rgba(255,194,122,.06)" },
  { xFraction: 0.15, yFraction: 0.5, radius: 14, color: "rgba(255,255,255,.04)" },
  { xFraction: 0.44, yFraction: 0.48, radius: 20, color: withAlpha(palette.accent, 0.05) },
];

function drawBackdrop(ctx: CanvasRenderingContext2D, geometry: ShotGeometry) {
  const { width, height, floorY, hoopX } = geometry;
  const sky = ctx.createLinearGradient(0, 0, 0, floorY);
  sky.addColorStop(0, "#09090c");
  sky.addColorStop(1, "#16161c");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  const spot = ctx.createRadialGradient(hoopX, -60, 10, hoopX, -60, height * 1.3);
  spot.addColorStop(0, "rgba(255,236,210,.14)");
  spot.addColorStop(1, "rgba(255,236,210,0)");
  ctx.fillStyle = spot;
  ctx.fillRect(0, 0, width, floorY);

  for (const { xFraction, yFraction, radius, color } of BOKEH) {
    const x = width * xFraction;
    const y = floorY * yFraction;
    const blob = ctx.createRadialGradient(x, y, 0, x, y, radius);
    blob.addColorStop(0, color);
    blob.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = blob;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawFloor(ctx: CanvasRenderingContext2D, geometry: ShotGeometry) {
  const { width, height, floorY, hoopX, boardX } = geometry;
  const wood = ctx.createLinearGradient(0, floorY, 0, height);
  wood.addColorStop(0, "#7a4e2c");
  wood.addColorStop(1, "#3a2414");
  ctx.fillStyle = wood;
  ctx.fillRect(0, floorY, width, height - floorY);

  ctx.strokeStyle = "rgba(0,0,0,.22)";
  ctx.lineWidth = 1;
  let boardY = floorY;
  let boardGap = 4;
  while (boardY < height) {
    ctx.beginPath();
    ctx.moveTo(0, boardY);
    ctx.lineTo(width, boardY);
    ctx.stroke();
    boardY += boardGap;
    boardGap *= 1.35;
  }
  for (let seamX = -40; seamX < width; seamX += 90) {
    ctx.beginPath();
    ctx.moveTo(seamX + 20, floorY);
    ctx.lineTo(seamX - 30, height);
    ctx.stroke();
  }

  ctx.fillStyle = withAlpha(palette.accent, 0.28);
  ctx.fillRect(hoopX - 120, floorY, boardX + 60 - (hoopX - 120), height - floorY);
  ctx.fillStyle = "rgba(255,255,255,.75)";
  ctx.fillRect(hoopX - 122, floorY, 3, height - floorY);

  const sheen = ctx.createLinearGradient(0, floorY, 0, floorY + 16);
  sheen.addColorStop(0, "rgba(255,230,200,.18)");
  sheen.addColorStop(1, "rgba(255,230,200,0)");
  ctx.fillStyle = sheen;
  ctx.fillRect(0, floorY, width, 16);
}

function drawStanchion(ctx: CanvasRenderingContext2D, geometry: ShotGeometry) {
  const { floorY, rimY, boardX } = geometry;
  const poleX = boardX + 70;
  const padWidth = 64;
  const padHeight = 58;
  const padY = floorY - padHeight;

  const pole = ctx.createLinearGradient(poleX - 8, 0, poleX + 8, 0);
  pole.addColorStop(0, "#4a4a55");
  pole.addColorStop(0.5, "#8c8c98");
  pole.addColorStop(1, "#3a3a44");
  ctx.fillStyle = pole;
  ctx.fillRect(poleX - 8, rimY - 72, 16, padY - (rimY - 72) + 4);
  ctx.fillRect(boardX - 4, rimY - 66, poleX - boardX + 4, 10);

  ctx.save();
  ctx.translate(boardX + 18, rimY - 56);
  ctx.rotate(Math.atan2(46, poleX - boardX - 18));
  ctx.fillRect(0, -3, Math.hypot(46, poleX - boardX - 18), 6);
  ctx.restore();

  ctx.fillStyle = "rgba(0,0,0,.35)";
  ctx.beginPath();
  ctx.ellipse(poleX, floorY + 3, padWidth / 2 + 6, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  const left = poleX - padWidth / 2;
  const padFill = ctx.createLinearGradient(0, padY, 0, floorY);
  padFill.addColorStop(0, "#3a3a46");
  padFill.addColorStop(1, "#24242c");
  ctx.fillStyle = padFill;
  ctx.beginPath();
  ctx.moveTo(left, floorY);
  ctx.lineTo(left, padY + 8);
  ctx.quadraticCurveTo(left, padY, left + 8, padY);
  ctx.lineTo(left + padWidth - 8, padY);
  ctx.quadraticCurveTo(left + padWidth, padY, left + padWidth, padY + 8);
  ctx.lineTo(left + padWidth, floorY);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = palette.accent;
  ctx.fillRect(left, padY + 16, padWidth, 7);
  ctx.fillStyle = "rgba(255,255,255,.08)";
  ctx.fillRect(left + 4, padY + 3, padWidth - 8, 3);
}

function drawBackboard(ctx: CanvasRenderingContext2D, geometry: ShotGeometry) {
  const { hoopX, rimY, halfRim } = geometry;
  const boardWidth = 116;
  const boardHeight = 80;
  const left = hoopX - boardWidth / 2 + 10;
  const top = rimY - 66;

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

  const targetX = hoopX - 18 + 10;
  const targetY = rimY - 30;
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
  ctx.moveTo(bracketX - 10, rimY - 16);
  ctx.lineTo(bracketX + 6, rimY - 17);
  ctx.lineTo(hoopX + halfRim + 2, rimY + 1);
  ctx.lineTo(hoopX + 4, rimY + 1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#2a2a32";
  ctx.fillRect(bracketX - 10, rimY - 20, 16, 6);
}

export function drawCourt(ctx: CanvasRenderingContext2D, geometry: ShotGeometry) {
  drawBackdrop(ctx, geometry);
  drawFloor(ctx, geometry);
  drawStanchion(ctx, geometry);
  drawBackboard(ctx, geometry);
}
