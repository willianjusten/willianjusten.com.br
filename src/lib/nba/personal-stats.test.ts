import { describe, expect, it } from "vitest";
import {
  EMPTY_PERSONAL_STATS,
  formatPercentage,
  formatShotCount,
  parsePersonalStats,
  recordPersonalShot,
} from "./personal-stats";

describe("personal stats", () => {
  it("builds a streak on makes, resets it on a miss and remembers the best", () => {
    let stats = EMPTY_PERSONAL_STATS;
    for (const made of [true, true, true, false, true]) {
      stats = recordPersonalShot(stats, made);
    }
    expect(stats).toEqual({ shots: 5, makes: 4, streak: 1, best: 3 });
  });

  it("round-trips through the stored JSON", () => {
    const stats = recordPersonalShot(EMPTY_PERSONAL_STATS, true);
    expect(parsePersonalStats(JSON.stringify(stats))).toEqual(stats);
  });

  it("falls back to empty stats for missing or corrupt storage", () => {
    expect(parsePersonalStats(null)).toEqual(EMPTY_PERSONAL_STATS);
    expect(parsePersonalStats("{nope")).toEqual(EMPTY_PERSONAL_STATS);
    expect(parsePersonalStats('{"shots":-1}')).toEqual(EMPTY_PERSONAL_STATS);
  });

  it("formats a percentage without dividing by zero", () => {
    expect(formatPercentage(0, 0)).toBe(0);
    expect(formatPercentage(1, 3)).toBe(33);
  });

  it("keeps shot counts under a thousand as they are", () => {
    expect(formatShotCount(0)).toBe("0");
    expect(formatShotCount(999)).toBe("999");
  });

  it("shortens big shot counts so the scoreboard never wraps", () => {
    expect(formatShotCount(1_000)).toBe("1K");
    expect(formatShotCount(12_345)).toBe("12.3K");
    expect(formatShotCount(999_949)).toBe("999.9K");
    expect(formatShotCount(1_250_000)).toBe("1.3M");
  });
});
