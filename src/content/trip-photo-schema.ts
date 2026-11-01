import { z } from "zod";

const optionalText = z.string().min(1).optional();

/** Camera settings read from the photo's EXIF, or typed by hand as Cloudinary context. Old photos have none. */
const photoExifSchema = z.object({
  camera: optionalText,
  lens: optionalText,
  focalLength: optionalText,
  aperture: optionalText,
  shutter: optionalText,
  iso: optionalText,
  year: optionalText,
});

const tripPhotoSchema = z.object({
  publicId: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  title: optionalText,
  exif: photoExifSchema.optional(),
  /** A tiny image as a data URL, shown blurred while the photo loads. */
  blurDataUrl: z.string().startsWith("data:image/"),
});

export const tripPhotosFileSchema = z.object({
  cloudName: z.string().min(1),
  /** Photos per Cloudinary folder, in filename order. */
  albums: z.record(z.string(), z.array(tripPhotoSchema).min(1)),
});

export type PhotoExif = z.output<typeof photoExifSchema>;
export type TripPhoto = z.output<typeof tripPhotoSchema>;
export type TripPhotosFile = z.output<typeof tripPhotosFileSchema>;
