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
  zoomBy,
} from "../lib/globe-motion";

describe("globe motion", () => {
  it("spins slowly on its own when idle", () => {
    const motion = createGlobeMotion();
    advanceGlobe(motion, { canIdleSpin: true, reduceMotion: false });
    expect(motion.view.lon).toBeGreaterThan(INITIAL_VIEW.lon);

    const still = createGlobeMotion();
    advanceGlobe(still, { canIdleSpin: false, reduceMotion: false });
    expect(still.view.lon).toBe(INITIAL_VIEW.lon);
  });

  it("flies to a point and clears the target on arrival", () => {
    const motion = createGlobeMotion();
    flyTo(motion, { lat: 10, lon: 20 }, 4);
    for (let frame = 0; frame < 400 && motion.flightTarget; frame++)
      advanceGlobe(motion, { canIdleSpin: true, reduceMotion: false });

    expect(motion.flightTarget).toBeNull();
    expect(motion.view.lat).toBeCloseTo(10, 1);
    expect(motion.view.lon).toBeCloseTo(20, 1);
  });

  it("jumps straight to a flight's destination when motion is reduced", () => {
    const motion = createGlobeMotion();
    flyTo(motion, { lat: 10, lon: 20 }, 4);
    advanceGlobe(motion, { canIdleSpin: false, reduceMotion: true });

    expect(motion.flightTarget).toBeNull();
    expect(motion.view).toEqual({ lat: 10, lon: 20, zoom: 4 });
  });

  it("zooms in one step when motion is reduced", () => {
    const motion = createGlobeMotion();
    zoomBy(motion, 2);
    advanceGlobe(motion, { canIdleSpin: false, reduceMotion: true });

    expect(motion.view.zoom).toBe(2);
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
    expect(easeCenterX(motion, 1000, { isAlbumOpen: false, reduceMotion: false })).toBe(500);
    expect(easeCenterX(motion, 1000, { isAlbumOpen: true, reduceMotion: false })).toBeLessThan(500);
    expect(easeCenterX(createGlobeMotion(), 600, { isAlbumOpen: true, reduceMotion: false })).toBe(
      300,
    );
  });

  it("moves the centre aside in one step when motion is reduced", () => {
    const motion = createGlobeMotion();
    easeCenterX(motion, 1000, { isAlbumOpen: false, reduceMotion: true });

    expect(easeCenterX(motion, 1000, { isAlbumOpen: true, reduceMotion: true })).toBe(340);
  });
});
