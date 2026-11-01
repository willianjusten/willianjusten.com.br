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

function paintCourtLayer(
  layer: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  geometry: ShotGeometry,
) {
  layer.width = ctx.canvas.width;
  layer.height = ctx.canvas.height;
  const layerContext = layer.getContext("2d");
  if (!layerContext) return;
  layerContext.setTransform(ctx.getTransform());
  // The live canvas reaches the court with the round cap the previous frame's rim left behind.
  layerContext.lineCap = "round";
  drawCourt(layerContext, geometry);
}

/** The court never moves, so it is painted once per canvas size and copied into every frame. */
export function createSceneRenderer() {
  const courtLayer = document.createElement("canvas");
  let courtLayerKey = "";

  return function drawScene(
    ctx: CanvasRenderingContext2D,
    geometry: ShotGeometry,
    scene: SceneState,
  ) {
    const layerKey = `${ctx.canvas.width}x${ctx.canvas.height}@${geometry.width}x${geometry.height}`;
    if (layerKey !== courtLayerKey) {
      paintCourtLayer(courtLayer, ctx, geometry);
      courtLayerKey = layerKey;
    }
    ctx.clearRect(0, 0, geometry.width, geometry.height);
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(courtLayer, 0, 0);
    ctx.restore();
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
  };
}
