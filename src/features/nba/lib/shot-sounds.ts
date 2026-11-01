import { ON_FIRE_STREAK } from "./personal-stats";

const MISS_STREAK_FOR_TERRIBLE_SHOT = 3;

export const SHOT_SOUND_FILES = {
  boomshakalaka: "/sounds/boomshakalaka.mp3",
  "on-fire": "/sounds/hes-on-fire.mp3",
  "terrible-shot": "/sounds/terrible-shot.mp3",
} as const;

export type ShotSound = keyof typeof SHOT_SOUND_FILES;

type ShotResult = {
  made: boolean;
  /** Makes in a row, counting this shot. */
  makeStreak: number;
  /** Misses in a row, counting this shot. */
  missStreak: number;
};

export function pickShotSound({ made, makeStreak, missStreak }: ShotResult): ShotSound | null {
  if (made) return makeStreak === ON_FIRE_STREAK ? "on-fire" : "boomshakalaka";
  return missStreak > 0 && missStreak % MISS_STREAK_FOR_TERRIBLE_SHOT === 0
    ? "terrible-shot"
    : null;
}
