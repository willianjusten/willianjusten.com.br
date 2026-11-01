import { palette } from "@/lib/palette";
import type { ShotGeometry } from "../shot-physics";

export const RESULT_MESSAGE_FRAMES = 80;

export type SceneMessage = { text: string; framesLeft: number };

/** Resolved CSS font-family values; canvas text cannot read CSS variables. */
export type SceneFonts = { display: string; mono: string };

export function drawMessage(
  ctx: CanvasRenderingContext2D,
  geometry: ShotGeometry,
  message: SceneMessage,
  fonts: SceneFonts,
) {
  const elapsed = RESULT_MESSAGE_FRAMES - message.framesLeft;
  ctx.save();
  ctx.globalAlpha = Math.min(1, message.framesLeft / 20);
  ctx.font = `800 ${Math.round(44 + elapsed * 0.25)}px ${fonts.display}`;
  ctx.textAlign = "center";
  const fill = ctx.createLinearGradient(geometry.hoopX - 260, 0, geometry.hoopX, 0);
  fill.addColorStop(0, palette.white);
  fill.addColorStop(1, palette.accent);
  ctx.fillStyle = fill;
  ctx.fillText(
    message.text,
    Math.max(140, geometry.hoopX - 220),
    geometry.rimY - 40 - elapsed * 0.5,
  );
  ctx.restore();
}

export function drawKeyboardAimHint(
  ctx: CanvasRenderingContext2D,
  geometry: ShotGeometry,
  text: string,
  fonts: SceneFonts,
) {
  const { startX, startY, floorY } = geometry;
  ctx.font = `500 12px ${fonts.mono}`;
  ctx.fillStyle = palette.textSecondary;
  ctx.textAlign = "left";
  const labelY = startY + 46 > floorY + 40 ? startY - 36 : startY + 46;
  ctx.fillText(text, startX - 40, labelY);
}
