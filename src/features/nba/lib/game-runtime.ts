import { ON_FIRE_STREAK } from "./personal-stats";
import { RESULT_MESSAGE_FRAMES, type SceneMessage } from "./renderer/overlay";
import type { AimState } from "./shot-input";
import {
  DEFAULT_SHOT_ANGLE_IN_DEGREES,
  isShootableSpeed,
  isShotOver,
  launchBall,
  stepBall,
  type Ball,
  type ShotGeometry,
  type ShotOutcome,
  type Velocity,
} from "./shot-physics";

const NET_DECAY_PER_FRAME = 0.95;
/** Makes in a row that bring Curry on. */
export const CURRY_CAMEO_STREAK = 3;
/** Five seconds at 60 Hz: walk on, hold the pose, walk off. */
export const CURRY_CAMEO_FRAMES = 300;

export type CurryCameo = { framesLeft: number };

type GameRuntime = {
  ball: Ball | null;
  aim: AimState;
  netEnergy: number;
  message: SceneMessage | null;
  seconds: number;
  wasScoredThisShot: boolean;
  curryCameo: CurryCameo | null;
};

type MadeShot = Exclude<ShotOutcome, "miss">;

export type RuntimeEvents = {
  onScore: (outcome: MadeShot) => void;
  onShotOver: (made: boolean) => void;
};

type ScoreLabels = { swish: string; bucket: string; onFire: string };

export function createGameRuntime(): GameRuntime {
  return {
    ball: null,
    aim: { pointer: null, keyboardHoldStart: null, keyboardAngle: DEFAULT_SHOT_ANGLE_IN_DEGREES },
    netEnergy: 0,
    message: null,
    seconds: 0,
    wasScoredThisShot: false,
    curryCameo: null,
  };
}

export function shoot(runtime: GameRuntime, geometry: ShotGeometry, velocity: Velocity) {
  if (runtime.ball || !isShootableSpeed(velocity)) return;
  runtime.ball = launchBall(geometry, velocity);
  runtime.wasScoredThisShot = false;
}

export function getScoreText(outcome: MadeShot, streakAfterMake: number, labels: ScoreLabels) {
  if (streakAfterMake >= ON_FIRE_STREAK) return labels.onFire;
  return outcome === "bucket" ? labels.bucket : labels.swish;
}

/** Returns whether this make brought Curry on. */
export function markScored(runtime: GameRuntime, text: string, streakAfterMake: number) {
  runtime.netEnergy = 1;
  runtime.message = { text, framesLeft: RESULT_MESSAGE_FRAMES };
  runtime.wasScoredThisShot = true;
  if (streakAfterMake !== CURRY_CAMEO_STREAK) return false;
  runtime.curryCameo = { framesLeft: CURRY_CAMEO_FRAMES };
  return true;
}

/** One 60 Hz step of the clock, net, message, cameo and ball. */
export function advanceRuntime(
  runtime: GameRuntime,
  geometry: ShotGeometry,
  events: RuntimeEvents,
) {
  runtime.seconds += 1 / 60;
  runtime.netEnergy *= NET_DECAY_PER_FRAME;
  if (runtime.message && --runtime.message.framesLeft <= 0) runtime.message = null;
  if (runtime.curryCameo && --runtime.curryCameo.framesLeft <= 0) runtime.curryCameo = null;

  const ball = runtime.ball;
  if (!ball) return;
  const outcome = stepBall(ball, geometry);
  if (outcome) events.onScore(outcome);
  if (isShotOver(ball, geometry)) {
    runtime.ball = null;
    events.onShotOver(runtime.wasScoredThisShot);
  }
}
