import type { Ball, ShotGeometry, Velocity } from "../shot-physics";
import { drawAimGuide, drawBall, drawTrail } from "./ball";
import { drawCourt } from "./court";
import { drawNet, drawRim } from "./hoop";
import { drawKeyboardAimHint, drawMessage, type SceneFonts, type SceneMessage } from "./overlay";

export type SceneState = {
  ball: Ball | null;
  aimVelocity: Velocity | null;
  keyboardAngleInDegrees: number | null;
  isOnFire: boolean;
  netEnergy: number;
  message: SceneMessage | null;
  seconds: number;
  fonts: SceneFonts;
  labels: { keyboardAim: (angle: number) => string };
};

export function drawScene(
  ctx: CanvasRenderingContext2D,
  geometry: ShotGeometry,
  scene: SceneState,
) {
  ctx.clearRect(0, 0, geometry.width, geometry.height);
  drawCourt(ctx, geometry);
  drawRim(ctx, geometry, "back");
  drawNet(ctx, geometry, scene.netEnergy, scene.seconds, "back");

  const ball = scene.ball;
  if (ball) {
    drawTrail(ctx, geometry, ball, scene.isOnFire);
    drawBall(ctx, geometry, ball, scene.isOnFire);
  } else {
    if (scene.aimVelocity) drawAimGuide(ctx, geometry, scene.aimVelocity);
    const bob = Math.sin(scene.seconds * 3) * 1.5;
    drawBall(
      ctx,
      geometry,
      { x: geometry.startX, y: geometry.startY + bob, rotation: 0 },
      scene.isOnFire,
    );
  }

  drawNet(ctx, geometry, scene.netEnergy, scene.seconds, "front");
  drawRim(ctx, geometry, "front");
  if (scene.message) drawMessage(ctx, geometry, scene.message, scene.fonts);
  if (scene.keyboardAngleInDegrees !== null) {
    const hint = scene.labels.keyboardAim(scene.keyboardAngleInDegrees);
    drawKeyboardAimHint(ctx, geometry, hint, scene.fonts);
  }
}
