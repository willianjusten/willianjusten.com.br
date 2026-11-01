import { describe, expect, it } from "vitest";
import { pickShotSound } from "../lib/shot-sounds";

describe("shot sounds", () => {
  it("plays boomshakalaka on a make", () => {
    expect(pickShotSound({ made: true, makeStreak: 1, missStreak: 0 })).toBe("boomshakalaka");
  });

  it("plays he's on fire on the third make in a row instead", () => {
    expect(pickShotSound({ made: true, makeStreak: 3, missStreak: 0 })).toBe("on-fire");
  });

  it("goes back to boomshakalaka for makes after the on fire call", () => {
    expect(pickShotSound({ made: true, makeStreak: 4, missStreak: 0 })).toBe("boomshakalaka");
  });

  it("stays quiet on the first and second misses in a row", () => {
    expect(pickShotSound({ made: false, makeStreak: 0, missStreak: 1 })).toBeNull();
    expect(pickShotSound({ made: false, makeStreak: 0, missStreak: 2 })).toBeNull();
  });

  it("plays terrible shot on every third miss in a row", () => {
    expect(pickShotSound({ made: false, makeStreak: 0, missStreak: 3 })).toBe("terrible-shot");
    expect(pickShotSound({ made: false, makeStreak: 0, missStreak: 4 })).toBeNull();
    expect(pickShotSound({ made: false, makeStreak: 0, missStreak: 6 })).toBe("terrible-shot");
  });
});
