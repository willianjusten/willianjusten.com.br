import { describe, expect, it } from "vitest";
import {
  blast,
  createParticleField,
  getBrokenShare,
  movePointer,
  rebuild,
  releasePointer,
  sampleGlyphPoints,
  stepParticleField,
  type ParticleField,
} from "../lib/particle-field";

const RADIUS = 2;

function run(field: ParticleField, steps: number) {
  for (let step = 0; step < steps; step++) stepParticleField(field, RADIUS, true);
}

function singleParticleField() {
  return createParticleField([{ x: 200, y: 100 }], 400, 300);
}

describe("particle field", () => {
  it("lets a slow hover nudge a particle without breaking it, then springs it home", () => {
    const field = singleParticleField();
    movePointer(field, 195, 100);
    run(field, 60);
    const [particle] = field.particles;
    expect(particle.x).toBeGreaterThan(205);
    expect(getBrokenShare(field)).toBe(0);

    releasePointer(field);
    run(field, 120);
    expect(particle.x).toBeCloseTo(200, 0);
    expect(particle.y).toBeCloseTo(100, 0);
  });

  it("breaks a particle loose on a fast swipe, and the loose particle falls to the floor", () => {
    const field = singleParticleField();
    movePointer(field, 150, 100);
    run(field, 1);
    movePointer(field, 195, 100);
    run(field, 1);
    movePointer(field, 240, 100);
    run(field, 4);
    expect(getBrokenShare(field)).toBe(1);

    releasePointer(field);
    run(field, 400);
    expect(field.particles[0].y).toBeCloseTo(300 - RADIUS, 0);
  });

  it("breaks everything inside a blast and leaves particles outside it alone", () => {
    const field = createParticleField(
      [
        { x: 100, y: 100 },
        { x: 130, y: 100 },
        { x: 380, y: 100 },
      ],
      400,
      300,
    );
    blast(field, 110, 100);
    expect(field.particles.map((particle) => particle.state)).toEqual([
      "loose",
      "loose",
      "attached",
    ]);
    expect(getBrokenShare(field)).toBeCloseTo(2 / 3);
  });

  it("rebuilds the number after it was broken", () => {
    const field = singleParticleField();
    blast(field, 200, 100);
    run(field, 200);
    rebuild(field);
    run(field, 200);
    const [particle] = field.particles;
    expect(particle.state).toBe("attached");
    expect(particle.x).toBeCloseTo(200, 0);
    expect(particle.y).toBeCloseTo(100, 0);
  });
});

describe("sampleGlyphPoints", () => {
  it("keeps only opaque pixels on the sampling grid", () => {
    const width = 4;
    const height = 4;
    const rgba = new Uint8ClampedArray(width * height * 4);
    const opaqueAt = (x: number, y: number) => (rgba[(y * width + x) * 4 + 3] = 255);
    opaqueAt(1, 1);
    opaqueAt(3, 3);
    opaqueAt(2, 2);

    expect(sampleGlyphPoints(rgba, width, height, 2)).toEqual([
      { x: 1, y: 1 },
      { x: 3, y: 3 },
    ]);
  });
});
