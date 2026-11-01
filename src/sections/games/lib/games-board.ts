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

export function buildShelfEntries(
  games: readonly Game[],
  covers: Record<string, GameCoverEntry>,
  locale: Locale,
): ShelfGame[] {
  return games.map(({ note, igdbId: _igdbId, ...game }) => {
    const cover = covers[game.slug];
    return {
      ...game,
      note: note?.[locale] ?? "",
      coverUrl: cover ? buildCoverUrl(cover.coverImageId, "case") : null,
    };
  });
}
