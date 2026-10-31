import { GAME_LISTS, GAME_PLATFORMS } from "@/content/games";
import type { Game, GameList, GamePlatform } from "@/content/games";

export type PlatformFilter = GamePlatform | "all";

export function countByList(games: readonly Game[]): Record<GameList, number> {
  const counts = Object.fromEntries(GAME_LISTS.map((list) => [list, 0])) as Record<
    GameList,
    number
  >;
  for (const game of games) {
    counts[game.list] += 1;
  }
  return counts;
}

/** Counts for the platform chips, scoped to the active tab. */
export function countByPlatform(
  games: readonly Game[],
  list: GameList,
): Record<PlatformFilter, number> {
  const counts = Object.fromEntries(
    GAME_PLATFORMS.map((platform) => [platform, 0]),
  ) as Record<GamePlatform, number>;
  let all = 0;
  for (const game of games) {
    if (game.list === list) {
      counts[game.platform] += 1;
      all += 1;
    }
  }
  return { all, ...counts };
}

export function filterShelf(
  games: readonly Game[],
  list: GameList,
  platform: PlatformFilter,
): Game[] {
  return games.filter(
    (game) => game.list === list && (platform === "all" || game.platform === platform),
  );
}
