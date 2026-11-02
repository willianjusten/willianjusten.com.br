import { z } from "zod";

const gameCoverEntrySchema = z.object({
  igdbId: z.number().int().positive(),
  /** The IGDB name that matched, kept so a wrong match is easy to spot in review. */
  igdbTitle: z.string().min(1),
  /** IGDB image id of the portrait cover (`co1abc`). */
  coverImageId: z.string().regex(/^[a-z0-9]+$/),
  /**
   * IGDB's first release date (`YYYY-MM-DD`), null while it has none. Kept for wishlist games
   * only, so the shelf can tell a released game from one still coming.
   */
  releaseDate: z.iso.date().nullable().optional(),
  fetchedAt: z.string(),
});

export const gameCoversFileSchema = z.record(z.string(), gameCoverEntrySchema);

export type GameCoverEntry = z.output<typeof gameCoverEntrySchema>;
