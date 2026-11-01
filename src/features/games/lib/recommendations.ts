import type { GamePlatform } from "@/content/games";

/** Pending ones are only ever sent to their submitter. */
export type RecommendationView = {
  id: number;
  title: string;
  year: number | null;
  platform: GamePlatform;
  coverUrl: string | null;
  status: "pending" | "approved";
  count: number;
  /** True when this browser has recommended it. */
  mine: boolean;
  createdAt: string;
};

/** Most recommended first; ties go to the newest so a fresh submission lands first among equals. */
export function sortRecommendations<T extends Pick<RecommendationView, "count" | "createdAt">>(
  recommendations: readonly T[],
): T[] {
  return [...recommendations].sort(
    (first, second) =>
      second.count - first.count || second.createdAt.localeCompare(first.createdAt),
  );
}
