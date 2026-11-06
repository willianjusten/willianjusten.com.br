import type { ImageLoaderProps } from "next/image";

/**
 * next/image loader that asks the image hosts to resize, so Vercel Image Optimization (and its
 * monthly transformation quota) is never used. Cloudinary resizes on the fly; IGDB only serves
 * fixed cover sizes, so the smallest one at least as wide as the request is picked.
 */

const CLOUDINARY_UPLOAD_PATH = "res.cloudinary.com/";
const UPLOAD_SEGMENT = "/image/upload/";
/** Caps what Cloudinary sends; the trip originals are up to 6000px wide. */
const MAX_CLOUDINARY_WIDTH_IN_PIXELS = 2400;

const IGDB_HOST = "images.igdb.com/";
/** IGDB cover sizes and their widths in pixels, smallest first. */
const IGDB_COVER_SIZES = [
  { token: "t_cover_small", width: 90 },
  { token: "t_cover_big", width: 264 },
  { token: "t_cover_big_2x", width: 528 },
] as const;
const IGDB_SIZE_TOKEN = /\/t_[a-z0-9_]+\//;

function loadCloudinaryImage(src: string, width: number, quality?: number) {
  const cappedWidth = Math.min(width, MAX_CLOUDINARY_WIDTH_IN_PIXELS);
  const transformation = ["f_auto", "c_limit", `w_${cappedWidth}`, `q_${quality ?? "auto"}`];
  return src.replace(UPLOAD_SEGMENT, `${UPLOAD_SEGMENT}${transformation.join(",")}/`);
}

function loadIgdbCover(src: string, width: number) {
  const size =
    IGDB_COVER_SIZES.find((coverSize) => coverSize.width >= width) ?? IGDB_COVER_SIZES.at(-1)!;
  return src.replace(IGDB_SIZE_TOKEN, `/${size.token}/`);
}

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  if (src.includes(CLOUDINARY_UPLOAD_PATH)) return loadCloudinaryImage(src, width, quality);
  if (src.includes(IGDB_HOST)) return loadIgdbCover(src, width);
  return src;
}
