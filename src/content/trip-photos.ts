import photosJson from "./generated/trip-photos.json";
import { tripPhotosFileSchema } from "./trip-photo-schema";

/** Written by `pnpm places:photos`. Do not edit by hand. */
export const tripPhotos = tripPhotosFileSchema.parse(photosJson);
