import { describe, expect, it } from "vitest";
import {
  advanceRuntime,
  createGameRuntime,
  getScoreText,
  markScored,
  shoot,
  type RuntimeEvents,
} from "../lib/game-runtime";
import { ON_FIRE_STREAK } from "../lib/personal-stats";
import { getShotGeometry } from "../lib/shot-physics";

const geometry = getShotGeometry(700, 400);
const labels = { swish: "Swish", bucket: "Bucket", onFire: "On fire" };

function velocityAt(angleInDegrees: number, speed: number) {
  const angle = (angleInDegrees * Math.PI) / 180;
  return { vx: speed * Math.cos(angle), vy: -speed * Math.sin(angle) };
}

function playOut(velocity: { vx: number; vy: number }) {
  const runtime = createGameRuntime();
  const scores: string[] = [];
  const shotsOver: boolean[] = [];
  const events: RuntimeEvents = {
    onScore: (outcome) => {
      scores.push(outcome);
      markScored(runtime, getScoreText(outcome, 1, labels));
    },
    onShotOver: (made) => shotsOver.push(made),
  };
  shoot(runtime, geometry, velocity);
  for (let step = 0; step < 2000 && runtime.ball; step++) advanceRuntime(runtime, geometry, events);
  return { runtime, scores, shotsOver };
}

describe("game runtime", () => {
  it("scores a make, then ends the shot as made", () => {
    const { runtime, scores, shotsOver } = playOut(velocityAt(62, 15.55));
    expect(scores).toEqual(["swish"]);
    expect(shotsOver).toEqual([true]);
    expect(runtime.ball).toBeNull();
  });

  it("ends a short shot as a miss without scoring", () => {
    const { scores, shotsOver } = playOut(velocityAt(56, 12));
    expect(scores).toEqual([]);
    expect(shotsOver).toEqual([false]);
  });

  it("ignores a shot too weak to launch", () => {
    const runtime = createGameRuntime();
    shoot(runtime, geometry, { vx: 0, vy: 0 });
    expect(runtime.ball).toBeNull();
  });

  it("calls a make on a streak on fire", () => {
    expect(getScoreText("bucket", ON_FIRE_STREAK, labels)).toBe("On fire");
    expect(getScoreText("bucket", 1, labels)).toBe("Bucket");
    expect(getScoreText("swish", 1, labels)).toBe("Swish");
  });
});
