/** Gravity added to vertical speed per frame, applied in two half-steps. */
export const GRAVITY_PER_FRAME = 0.35;
export const SUBSTEPS_PER_FRAME = 2;
export const MAX_SHOT_SPEED = 24;
export const MIN_SHOT_ANGLE_IN_DEGREES = 30;
export const MAX_SHOT_ANGLE_IN_DEGREES = 80;
export const DEFAULT_SHOT_ANGLE_IN_DEGREES = 56;
/** Drag distance (px) to launch speed. */
export const DRAG_TO_SPEED_RATIO = 0.16;
export const MIN_SHOT_SPEED = 2;
export const KEYBOARD_MIN_SPEED = 6;
export const KEYBOARD_MAX_SPEED = 24;
/** Seconds for the keyboard power meter to go from empty to full. */
export const KEYBOARD_SWEEP_SECONDS = 1.1;

const FLOOR_BOUNCE = 0.55;
const FLOOR_FRICTION = 0.82;
const RIM_BOUNCE = 1.6;
const RIM_CONTACT_PADDING = 2.5;
const BACKBOARD_BOUNCE = 0.6;
const BACKBOARD_THICKNESS = 12;
const RIM_PLANE_OFFSET = 2;
/** The make window is inset from the rim edges so grazing the iron does not count. */
const RIM_MAKE_INSET = 2;
const RESTING_SPEED = 0.6;
const FRAMES_AT_REST_TO_END = 35;
const MAX_FRAMES_IN_FLIGHT = 380;
const OFFSCREEN_MARGIN = 60;
const TRAIL_LENGTH = 14;

export type ShotGeometry = {
  width: number;
  height: number;
  floorY: number;
  ballRadius: number;
  startX: number;
  startY: number;
  hoopX: number;
  rimY: number;
  /** Half the rim width: the rim edges sit at hoopX +/- halfRim. */
  halfRim: number;
  boardX: number;
};

export function getShotGeometry(width: number, height: number): ShotGeometry {
  const floorY = height - 58;
  const ballRadius = 14;
  const hoopX = width - Math.max(150, Math.min(210, width * 0.22));
  const halfRim = 26;
  return {
    width,
    height,
    floorY,
    ballRadius,
    startX: Math.max(70, Math.min(130, width * 0.13)),
    startY: floorY - ballRadius,
    hoopX,
    rimY: Math.round(height * 0.4),
    halfRim,
    boardX: hoopX + halfRim + 18,
  };
}

export type ShotOutcome = "swish" | "bucket" | "miss";

export type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  touched: boolean;
  scored: boolean;
  framesInFlight: number;
  framesAtRest: number;
  trail: { x: number; y: number }[];
};

export type Velocity = { vx: number; vy: number };

export function launchBall(geometry: ShotGeometry, velocity: Velocity): Ball {
  return {
    x: geometry.startX,
    y: geometry.startY,
    vx: velocity.vx,
    vy: velocity.vy,
    rotation: 0,
    touched: false,
    scored: false,
    framesInFlight: 0,
    framesAtRest: 0,
    trail: [],
  };
}

function clampSpeed(velocity: Velocity): Velocity {
  const speed = Math.hypot(velocity.vx, velocity.vy);
  if (speed <= MAX_SHOT_SPEED) return velocity;
  const scale = MAX_SHOT_SPEED / speed;
  return { vx: velocity.vx * scale, vy: velocity.vy * scale };
}

/** Slingshot: pulling the pointer back from the ball launches it the opposite way. */
export function getDragVelocity(geometry: ShotGeometry, pointer: { x: number; y: number }) {
  return clampSpeed({
    vx: (geometry.startX - pointer.x) * DRAG_TO_SPEED_RATIO,
    vy: (geometry.startY - pointer.y) * DRAG_TO_SPEED_RATIO,
  });
}

/** 0..1..0 triangle wave of the held-key time, so power sweeps up and back down. */
export function getKeyboardPower(heldSeconds: number): number {
  const phase = (heldSeconds / KEYBOARD_SWEEP_SECONDS) % 2;
  return 1 - Math.abs(1 - phase);
}

export function getKeyboardVelocity(heldSeconds: number, angleInDegrees: number): Velocity {
  const speed =
    KEYBOARD_MIN_SPEED + getKeyboardPower(heldSeconds) * (KEYBOARD_MAX_SPEED - KEYBOARD_MIN_SPEED);
  const angle = (angleInDegrees * Math.PI) / 180;
  return { vx: speed * Math.cos(angle), vy: -speed * Math.sin(angle) };
}

export function clampAngle(angleInDegrees: number): number {
  return Math.max(MIN_SHOT_ANGLE_IN_DEGREES, Math.min(MAX_SHOT_ANGLE_IN_DEGREES, angleInDegrees));
}

export function isShootableSpeed(velocity: Velocity): boolean {
  return Math.hypot(velocity.vx, velocity.vy) > MIN_SHOT_SPEED;
}

/** Rim-edge circles: the ball bounces off the left and right ends of the rim. */
function collideWithRimEdge(ball: Ball, geometry: ShotGeometry, edgeX: number) {
  const dx = ball.x - edgeX;
  const dy = ball.y - geometry.rimY;
  const distance = Math.hypot(dx, dy);
  const contactDistance = geometry.ballRadius + RIM_CONTACT_PADDING;
  if (distance >= contactDistance || distance === 0) return;

  const normalX = dx / distance;
  const normalY = dy / distance;
  const approach = ball.vx * normalX + ball.vy * normalY;
  if (approach < 0) {
    ball.vx -= RIM_BOUNCE * approach * normalX;
    ball.vy -= RIM_BOUNCE * approach * normalY;
    ball.touched = true;
  }
  ball.x = edgeX + normalX * contactDistance;
  ball.y = geometry.rimY + normalY * contactDistance;
}

function collideWithBackboard(ball: Ball, geometry: ShotGeometry) {
  const isInsideBoard =
    ball.x + geometry.ballRadius > geometry.boardX &&
    ball.x < geometry.boardX + BACKBOARD_THICKNESS &&
    ball.y > geometry.rimY - 92 &&
    ball.y < geometry.rimY + 14;
  if (isInsideBoard && ball.vx > 0) {
    ball.vx = -ball.vx * BACKBOARD_BOUNCE;
    ball.x = geometry.boardX - geometry.ballRadius;
    ball.touched = true;
  }
}

function bounceOffFloor(ball: Ball, geometry: ShotGeometry) {
  if (ball.y + geometry.ballRadius > geometry.floorY) {
    ball.y = geometry.floorY - geometry.ballRadius;
    ball.vy = -ball.vy * FLOOR_BOUNCE;
    ball.vx *= FLOOR_FRICTION;
  }
}

/**
 * Advance one frame (two substeps). Returns the outcome on the frame the ball goes through the
 * rim: "swish" if it touched nothing, "bucket" if it hit the rim or board first. Otherwise null.
 */
export function stepBall(ball: Ball, geometry: ShotGeometry): "swish" | "bucket" | null {
  const rimLeft = geometry.hoopX - geometry.halfRim;
  const rimRight = geometry.hoopX + geometry.halfRim;
  const gravityPerSubstep = GRAVITY_PER_FRAME / SUBSTEPS_PER_FRAME;
  let outcome: "swish" | "bucket" | null = null;

  for (let substep = 0; substep < SUBSTEPS_PER_FRAME; substep += 1) {
    const previousY = ball.y;
    ball.vy += gravityPerSubstep;
    ball.x += ball.vx / SUBSTEPS_PER_FRAME;
    ball.y += ball.vy / SUBSTEPS_PER_FRAME;
    ball.rotation += ball.vx / SUBSTEPS_PER_FRAME / geometry.ballRadius;

    collideWithRimEdge(ball, geometry, rimLeft);
    collideWithRimEdge(ball, geometry, rimRight);
    collideWithBackboard(ball, geometry);

    const rimPlaneY = geometry.rimY + RIM_PLANE_OFFSET;
    const crossedRimPlaneDownward = ball.vy > 0 && previousY < rimPlaneY && ball.y >= rimPlaneY;
    const isBetweenRimEdges =
      ball.x > rimLeft + RIM_MAKE_INSET && ball.x < rimRight - RIM_MAKE_INSET;
    if (!ball.scored && crossedRimPlaneDownward && isBetweenRimEdges) {
      ball.scored = true;
      outcome = ball.touched ? "bucket" : "swish";
    }

    bounceOffFloor(ball, geometry);
  }

  ball.framesInFlight += 1;
  ball.trail.push({ x: ball.x, y: ball.y });
  if (ball.trail.length > TRAIL_LENGTH) ball.trail.shift();
  const isOnFloor = ball.y >= geometry.floorY - geometry.ballRadius - 1;
  if (Math.abs(ball.vy) < RESTING_SPEED && isOnFloor) ball.framesAtRest += 1;

  return outcome;
}

export function isShotOver(ball: Ball, geometry: ShotGeometry): boolean {
  return (
    ball.framesAtRest > FRAMES_AT_REST_TO_END ||
    ball.framesInFlight > MAX_FRAMES_IN_FLIGHT ||
    ball.x < -OFFSCREEN_MARGIN ||
    ball.x > geometry.width + OFFSCREEN_MARGIN
  );
}

export function simulateShot(geometry: ShotGeometry, velocity: Velocity): ShotOutcome {
  const ball = launchBall(geometry, velocity);
  let result: ShotOutcome = "miss";
  while (!isShotOver(ball, geometry)) {
    const outcome = stepBall(ball, geometry);
    if (outcome) result = outcome;
  }
  return result;
}
