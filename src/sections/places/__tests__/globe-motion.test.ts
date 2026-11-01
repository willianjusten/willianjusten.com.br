import { describe, expect, it } from "vitest";
import {
  INITIAL_VIEW,
  advanceGlobe,
  createGlobeMotion,
  dragTo,
  easeCenterX,
  flyTo,
  nudgeByArrowKey,
  startDrag,
} from "../lib/globe-motion";

describe("globe motion", () => {
  it("spins slowly on its own when idle", () => {
    const motion = createGlobeMotion();
    advanceGlobe(motion, true);
    expect(motion.view.lon).toBeGreaterThan(INITIAL_VIEW.lon);

    const still = createGlobeMotion();
    advanceGlobe(still, false);
    expect(still.view.lon).toBe(INITIAL_VIEW.lon);
  });

  it("flies to a point and clears the target on arrival", () => {
    const motion = createGlobeMotion();
    flyTo(motion, { lat: 10, lon: 20 }, 4);
    for (let frame = 0; frame < 400 && motion.flightTarget; frame++) advanceGlobe(motion, true);

    expect(motion.flightTarget).toBeNull();
    expect(motion.view.lat).toBeCloseTo(10, 1);
    expect(motion.view.lon).toBeCloseTo(20, 1);
  });

  it("follows a drag and keeps its velocity as inertia", () => {
    const motion = createGlobeMotion();
    startDrag(motion, 100, 100);
    dragTo(motion, 80, 100, 200);

    expect(motion.view.lon).toBeGreaterThan(INITIAL_VIEW.lon);
    expect(motion.velocity.lon).toBeGreaterThan(0);
  });

  it("turns arrow keys into spin and ignores other keys", () => {
    const motion = createGlobeMotion();
    expect(nudgeByArrowKey(motion, "ArrowUp")).toBe(true);
    expect(motion.velocity.lat).toBeGreaterThan(0);
    expect(nudgeByArrowKey(motion, "Enter")).toBe(false);
  });

  it("slides the centre left while an album is open on a wide stage", () => {
    const motion = createGlobeMotion();
    expect(easeCenterX(motion, 1000, false)).toBe(500);
    expect(easeCenterX(motion, 1000, true)).toBeLessThan(500);
    expect(easeCenterX(createGlobeMotion(), 600, true)).toBe(300);
  });
});
