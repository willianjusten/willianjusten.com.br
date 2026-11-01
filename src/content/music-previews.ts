import previewsJson from "./generated/music-previews.json";
import { previewsFileSchema } from "./music-preview-schema";

/** Written by `pnpm music:previews`. Do not edit by hand. */
export const musicPreviews = previewsFileSchema.parse(previewsJson);
