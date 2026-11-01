import { buildCoverUrl } from "@/lib/games/igdb";
import type { GameCoverEntry } from "./game-cover-schema";
import type { Game } from "./games";

export type ShelfGame = Omit<Game, "note" | "igdbId"> & {
  /** The note in the visitor's language, or empty when the game has none. */
  note: string;
  /** Portrait IGDB cover, or null to fall back to the tone. */
  coverUrl: string | null;
};

/** Joins the curated games with their fetched IGDB covers and picks the note for the locale. */
export function buildShelfEntries(
  games: readonly Game[],
  covers: Record<string, GameCoverEntry>,
  locale: "en" | "pt",
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
