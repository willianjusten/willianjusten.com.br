import type { Locale } from "next-intl";
import { buildCoverUrl } from "./igdb";
import type { GameCoverEntry } from "@/content/game-cover-schema";
import type { Game } from "@/content/games";

export type ShelfGame = Omit<Game, "note" | "igdbId"> & {
  /** The note in the visitor's language, or empty when the game has none. */
  note: string;
  /** Portrait IGDB cover, or null to fall back to the tone. */
  coverUrl: string | null;
};

/** The release year of a wishlist game that is already out, so its case stops saying it is coming. */
function releasedYear(cover: GameCoverEntry | undefined, today: Date): number | undefined {
  const releaseDate = cover?.releaseDate;
  if (!releaseDate || releaseDate > today.toISOString()) return undefined;
  return Number(releaseDate.slice(0, "YYYY".length));
}

/** `today` is read when the page renders, which for this static page is at build time. */
export function buildShelfEntries(
  games: readonly Game[],
  covers: Record<string, GameCoverEntry>,
  locale: Locale,
  today: Date = new Date(),
): ShelfGame[] {
  return games.map(({ note, igdbId: _igdbId, ...game }) => {
    const cover = covers[game.slug];
    return {
      ...game,
      ...(game.list === "wishlist" && game.year === undefined
        ? { year: releasedYear(cover, today) }
        : {}),
      note: note?.[locale] ?? "",
      coverUrl: cover ? buildCoverUrl(cover.coverImageId, "case") : null,
    };
  });
}
