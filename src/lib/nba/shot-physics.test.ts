import { describe, expect, it } from "vitest";
import {
  clampAngle,
  getDragVelocity,
  getKeyboardPower,
  getKeyboardVelocity,
  getShotGeometry,
  MAX_SHOT_SPEED,
  simulateShot,
} from "./shot-physics";

const geometry = getShotGeometry(700, 400);

function velocityAt(angleInDegrees: number, speed: number) {
  const angle = (angleInDegrees * Math.PI) / 180;
  return { vx: speed * Math.cos(angle), vy: -speed * Math.sin(angle) };
}

describe("simulateShot", () => {
  it("scores a clean make as a swish", () => {
    expect(simulateShot(geometry, velocityAt(62, 15.55))).toBe("swish");
  });

  it("scores a make that kisses the rim as a bucket", () => {
    expect(simulateShot(geometry, velocityAt(56, 15.4))).toBe("bucket");
  });

  it("misses a shot that falls short", () => {
    expect(simulateShot(geometry, velocityAt(56, 12))).toBe("miss");
  });

  it("misses a shot that flies long", () => {
    expect(simulateShot(geometry, velocityAt(40, 24))).toBe("miss");
  });
});

describe("input velocities", () => {
  it("launches opposite to the drag direction and clamps to max speed", () => {
    const pulledBack = getDragVelocity(geometry, {
      x: geometry.startX - 1000,
      y: geometry.startY + 1000,
    });
    expect(pulledBack.vx).toBeGreaterThan(0);
    expect(pulledBack.vy).toBeLessThan(0);
    expect(Math.hypot(pulledBack.vx, pulledBack.vy)).toBeCloseTo(MAX_SHOT_SPEED);
  });

  it("sweeps keyboard power up and back down", () => {
    expect(getKeyboardPower(0)).toBe(0);
    expect(getKeyboardPower(1.1)).toBeCloseTo(1);
    expect(getKeyboardPower(2.2)).toBeCloseTo(0);
  });

  it("aims the keyboard shot at the chosen angle", () => {
    const velocity = getKeyboardVelocity(1.1, 56);
    expect(Math.atan2(-velocity.vy, velocity.vx)).toBeCloseTo((56 * Math.PI) / 180);
  });

  it("keeps the angle between 30 and 80 degrees", () => {
    expect(clampAngle(10)).toBe(30);
    expect(clampAngle(95)).toBe(80);
    expect(clampAngle(56)).toBe(56);
  });
});
