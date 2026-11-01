import { z } from "zod";

export const gameCoverEntrySchema = z.object({
  igdbId: z.number().int().positive(),
  /** The IGDB name that matched, kept so a wrong match is easy to spot in review. */
  igdbTitle: z.string().min(1),
  /** IGDB image id of the portrait cover (`co1abc`). */
  coverImageId: z.string().regex(/^[a-z0-9]+$/),
  fetchedAt: z.string(),
});

export const gameCoversFileSchema = z.record(z.string(), gameCoverEntrySchema);

export type GameCoverEntry = z.output<typeof gameCoverEntrySchema>;
