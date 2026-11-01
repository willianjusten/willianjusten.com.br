import {
  clampAngle,
  getDragVelocity,
  getKeyboardVelocity,
  type ShotGeometry,
  type Velocity,
} from "./shot-physics";

const KEYBOARD_ANGLE_STEP_IN_DEGREES = 2;
const POINTER_GRAB_RADIUS_IN_PIXELS = 70;
const MILLISECONDS_PER_SECOND = 1000;
const SHOT_KEYS = new Set([" ", "Enter"]);

export type AimState = {
  pointer: { x: number; y: number } | null;
  keyboardHoldStart: number | null;
  keyboardAngle: number;
};

export function getAimVelocity(aim: AimState, geometry: ShotGeometry): Velocity | null {
  if (aim.pointer) return getDragVelocity(geometry, aim.pointer);
  if (aim.keyboardHoldStart === null) return null;
  const heldSeconds = (performance.now() - aim.keyboardHoldStart) / MILLISECONDS_PER_SECOND;
  return getKeyboardVelocity(heldSeconds, aim.keyboardAngle);
}

type ShotInputOptions = {
  aim: AimState;
  getGeometry: () => ShotGeometry;
  isBallInFlight: () => boolean;
  shoot: (velocity: Velocity) => void;
};

export function attachShotInput(
  canvas: HTMLCanvasElement,
  { aim, getGeometry, isBallInFlight, shoot }: ShotInputOptions,
): () => void {
  const controller = new AbortController();
  const listenerOptions = { signal: controller.signal };

  function toCanvasPoint(event: PointerEvent) {
    const bounds = canvas.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  }

  function releasePointer(event: PointerEvent, shouldShoot: boolean) {
    if (!aim.pointer) return;
    if (shouldShoot) shoot(getDragVelocity(getGeometry(), toCanvasPoint(event)));
    aim.pointer = null;
    canvas.style.cursor = "";
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  }

  function releaseKeyboardShot() {
    if (aim.keyboardHoldStart === null) return;
    const velocity = getAimVelocity(aim, getGeometry());
    aim.keyboardHoldStart = null;
    if (velocity) shoot(velocity);
  }

  canvas.addEventListener(
    "pointerdown",
    (event) => {
      if (isBallInFlight()) return;
      const geometry = getGeometry();
      const point = toCanvasPoint(event);
      const distance = Math.hypot(point.x - geometry.startX, point.y - geometry.startY);
      if (distance > POINTER_GRAB_RADIUS_IN_PIXELS) return;
      aim.pointer = point;
      canvas.setPointerCapture(event.pointerId);
      canvas.style.cursor = "grabbing";
    },
    listenerOptions,
  );
  canvas.addEventListener(
    "pointermove",
    (event) => {
      if (aim.pointer) aim.pointer = toCanvasPoint(event);
    },
    listenerOptions,
  );
  canvas.addEventListener("pointerup", (event) => releasePointer(event, true), listenerOptions);
  canvas.addEventListener(
    "pointercancel",
    (event) => releasePointer(event, false),
    listenerOptions,
  );
  canvas.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        const direction = event.key === "ArrowUp" ? 1 : -1;
        aim.keyboardAngle = clampAngle(
          aim.keyboardAngle + direction * KEYBOARD_ANGLE_STEP_IN_DEGREES,
        );
        event.preventDefault();
      } else if (SHOT_KEYS.has(event.key)) {
        event.preventDefault();
        if (!event.repeat && !isBallInFlight() && aim.keyboardHoldStart === null) {
          aim.keyboardHoldStart = performance.now();
        }
      }
    },
    listenerOptions,
  );
  canvas.addEventListener(
    "keyup",
    (event) => {
      if (!SHOT_KEYS.has(event.key)) return;
      event.preventDefault();
      releaseKeyboardShot();
    },
    listenerOptions,
  );
  canvas.addEventListener("blur", releaseKeyboardShot, listenerOptions);

  return () => controller.abort();
}
