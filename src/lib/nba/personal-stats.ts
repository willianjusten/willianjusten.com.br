import { z } from "zod";

export const PERSONAL_STATS_STORAGE_KEY = "nba-shot-stats";
export const ON_FIRE_STREAK = 3;

const count = z.number().int().nonnegative();
const personalStatsSchema = z.object({ shots: count, makes: count, streak: count, best: count });

export type PersonalStats = z.infer<typeof personalStatsSchema>;

export const EMPTY_PERSONAL_STATS: PersonalStats = { shots: 0, makes: 0, streak: 0, best: 0 };

/** Tolerates missing, corrupt or tampered storage by falling back to empty stats. */
export function parsePersonalStats(rawValue: string | null): PersonalStats {
  if (!rawValue) return EMPTY_PERSONAL_STATS;
  try {
    const parsed = personalStatsSchema.safeParse(JSON.parse(rawValue));
    return parsed.success ? parsed.data : EMPTY_PERSONAL_STATS;
  } catch {
    return EMPTY_PERSONAL_STATS;
  }
}

export function recordPersonalShot(stats: PersonalStats, made: boolean): PersonalStats {
  const streak = made ? stats.streak + 1 : 0;
  return {
    shots: stats.shots + 1,
    makes: stats.makes + (made ? 1 : 0),
    streak,
    best: Math.max(stats.best, streak),
  };
}

export function formatPercentage(makes: number, shots: number): number {
  return shots === 0 ? 0 : Math.round((makes / shots) * 100);
}
