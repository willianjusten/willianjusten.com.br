import { palette } from "@/lib/palette";
import { CURRY_CAMEO_FRAMES, type CurryCameo } from "../game-runtime";
import type { ShotGeometry } from "../shot-physics";
import type { SceneFonts } from "./overlay";

const JERSEY_BLUE = "#1d428a";
const JERSEY_GOLD = "#ffc72c";
const SKIN = "#b07a52";
const SKIN_SHADE = "#93623f";
const HAIR = "#1a1210";
const SHOE = "#f2f2ee";
const MOUTHGUARD = "#eef3f6";

const WALK_FRAMES = 36;
/** Room (px) between the resting ball and his shadow on narrow courts. */
const MIN_GAP_FROM_BALL = 70;
const SNORE_LETTERS = 3;

function easeOutCubic(progress: number) {
  return 1 - (1 - progress) ** 3;
}

/** 0 off-screen, 1 in place: eases in over the first frames and back out over the last. */
function getPresence(cameo: CurryCameo) {
  const elapsed = CURRY_CAMEO_FRAMES - cameo.framesLeft;
  const walkOn = Math.min(1, elapsed / WALK_FRAMES);
  const walkOff = Math.min(1, cameo.framesLeft / WALK_FRAMES);
  return easeOutCubic(Math.min(walkOn, walkOff));
}

function drawLimb(ctx: CanvasRenderingContext2D, points: [number, number][], width: number) {
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(...points[0]);
  for (const point of points.slice(1)) ctx.lineTo(...point);
  ctx.stroke();
}

/** Drawn in local units: the origin is between his feet, up is negative y. */
function drawFigure(ctx: CanvasRenderingContext2D, fonts: SceneFonts, breath: number) {
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.fillStyle = "rgba(0,0,0,.35)";
  ctx.beginPath();
  ctx.ellipse(0, 2, 26, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = SKIN;
  drawLimb(
    ctx,
    [
      [-7, -52],
      [-9, -6],
    ],
    10,
  );
  drawLimb(
    ctx,
    [
      [7, -52],
      [9, -6],
    ],
    10,
  );
  ctx.fillStyle = SHOE;
  for (const footX of [-11, 11]) {
    ctx.beginPath();
    ctx.ellipse(footX, -4, 10, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.save();
  ctx.translate(0, breath);

  ctx.fillStyle = JERSEY_BLUE;
  ctx.fillRect(-18, -84, 36, 36);
  ctx.fillStyle = JERSEY_GOLD;
  ctx.fillRect(-18, -84, 4, 36);
  ctx.fillRect(14, -84, 4, 36);

  ctx.fillStyle = JERSEY_BLUE;
  ctx.beginPath();
  ctx.moveTo(-18, -122);
  ctx.lineTo(18, -122);
  ctx.lineTo(16, -80);
  ctx.lineTo(-16, -80);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = JERSEY_GOLD;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, -124, 8, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = JERSEY_GOLD;
  ctx.font = `800 17px ${fonts.display}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("30", 0, -100);

  // The night night pose: palms pressed together as a pillow under the tilted head.
  ctx.strokeStyle = SKIN;
  drawLimb(
    ctx,
    [
      [15, -117],
      [2, -104],
      [-15, -134],
    ],
    8,
  );
  drawLimb(
    ctx,
    [
      [-15, -117],
      [-27, -112],
      [-18, -134],
    ],
    8,
  );

  ctx.save();
  ctx.translate(-2, -142);
  ctx.rotate(-0.38);
  ctx.fillStyle = SKIN;
  ctx.beginPath();
  ctx.arc(0, 0, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = HAIR;
  ctx.beginPath();
  ctx.arc(0, -2, 13.5, Math.PI * 1.05, Math.PI * 1.95);
  ctx.fill();
  ctx.strokeStyle = HAIR;
  ctx.lineWidth = 1.6;
  for (const eyeX of [-5, 5]) {
    ctx.beginPath();
    ctx.arc(eyeX, 1, 2.6, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();
  }
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 2, 11, 0.25 * Math.PI, 0.75 * Math.PI);
  ctx.stroke();

  // His trademark mouthguard, half chewed and hanging out of the corner of his mouth.
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(-3, 7);
  ctx.lineTo(3, 7);
  ctx.stroke();
  ctx.save();
  ctx.translate(4.5, 8);
  ctx.rotate(0.5);
  ctx.fillStyle = MOUTHGUARD;
  ctx.beginPath();
  ctx.roundRect(-1.5, -1.5, 6, 3.5, 1.5);
  ctx.fill();
  ctx.restore();
  ctx.restore();

  ctx.fillStyle = SKIN_SHADE;
  ctx.beginPath();
  ctx.ellipse(-19, -138, 5, 9, -0.3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawSnore(ctx: CanvasRenderingContext2D, fonts: SceneFonts, seconds: number) {
  const baseAlpha = ctx.globalAlpha;
  ctx.fillStyle = palette.textSecondary;
  ctx.textAlign = "center";
  for (let letter = 0; letter < SNORE_LETTERS; letter++) {
    const phase = (seconds * 0.6 + letter / SNORE_LETTERS) % 1;
    ctx.globalAlpha = baseAlpha * Math.sin(phase * Math.PI);
    ctx.font = `700 ${Math.round(10 + phase * 8)}px ${fonts.display}`;
    ctx.fillText("z", 12 + phase * 22, -160 - phase * 34);
  }
  ctx.globalAlpha = baseAlpha;
}

export function drawCurryCameo(
  ctx: CanvasRenderingContext2D,
  geometry: ShotGeometry,
  cameo: CurryCameo,
  caption: string,
  seconds: number,
  fonts: SceneFonts,
) {
  const presence = getPresence(cameo);
  // Halfway between the ball and the paint, which court.ts starts 120px before the hoop.
  const paintEdgeX = geometry.hoopX - 120;
  const restingX = Math.max(
    geometry.startX + MIN_GAP_FROM_BALL,
    (geometry.startX + paintEdgeX) / 2,
  );
  const x = -60 + (restingX + 60) * presence;
  const breath = Math.sin(seconds * 2.2) * 1.2;

  ctx.save();
  ctx.globalAlpha = presence;
  ctx.translate(x, geometry.floorY);
  drawFigure(ctx, fonts, breath);
  drawSnore(ctx, fonts, seconds);

  ctx.font = `800 26px ${fonts.display}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = JERSEY_GOLD;
  ctx.fillText(caption, 0, -212);
  ctx.restore();
}
