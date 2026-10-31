import { z } from "zod";
import previewsJson from "./generated/music-previews.json";

export const previewEntrySchema = z.object({
  /** Which provider answered: iTunes first, Deezer as fallback. */
  source: z.enum(["itunes", "deezer"]),
  /** 30 second preview, streamed from the provider and never stored. */
  previewUrl: z.url(),
  /** iTunes `trackViewUrl`. Absent when only Deezer found the track. */
  appleMusicUrl: z.url().optional(),
  artworkUrl: z.url().optional(),
  fetchedAt: z.string(),
});

export const previewsFileSchema = z.record(z.string(), previewEntrySchema);

export type PreviewEntry = z.output<typeof previewEntrySchema>;

/** Written by `pnpm music:previews`. Do not edit by hand. */
export const musicPreviews = previewsFileSchema.parse(previewsJson);
