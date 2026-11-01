import type { PhotoExif, TripPhoto } from "../../src/content/trip-photo-schema.ts";

/** The fields this loader asks the Cloudinary Search API for. */
export type CloudinaryImage = {
  public_id: string;
  folder: string;
  filename: string;
  width: number;
  height: number;
  /** Raw EXIF and file tags, keyed by tag name. */
  image_metadata?: Record<string, string>;
  /** Hand-typed key-value context. */
  context?: Record<string, string>;
};

export type AlbumPhoto = Omit<TripPhoto, "blurDataUrl">;

const naturalOrder = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

function readExif(
  exif: Record<string, string>,
  context: Record<string, string>,
): PhotoExif | undefined {
  const camera = [exif.Make, exif.Model].filter(Boolean).join(" ");
  const focalLength = exif.FocalLength?.replace(/\.0\b/, "").replace(/\s+/g, "");
  const captureYear = (exif.DateTimeOriginal ?? exif.CreateDate)?.slice(0, 4);
  const settings: PhotoExif = {
    camera: camera || context.camera,
    lens: exif.LensModel ?? context.lens,
    focalLength: focalLength ?? context.focalLength,
    aperture: exif.FNumber ? `f/${exif.FNumber}` : context.aperture,
    shutter: exif.ExposureTime ? `${exif.ExposureTime}s` : context.shutter,
    iso: exif.ISO ? `ISO ${exif.ISO}` : context.iso,
    year: captureYear ?? context.year,
  };
  const filledSettings: PhotoExif = Object.fromEntries(
    Object.entries(settings).filter(([, value]) => value),
  );
  return Object.keys(filledSettings).length > 0 ? filledSettings : undefined;
}

function toAlbumPhoto(image: CloudinaryImage): AlbumPhoto {
  const context = image.context ?? {};
  const exif = readExif(image.image_metadata ?? {}, context);
  return {
    publicId: image.public_id,
    width: image.width,
    height: image.height,
    ...(context.title ? { title: context.title } : {}),
    ...(exif ? { exif } : {}),
  };
}

/**
 * Groups the search results into one album per configured folder, in filename order.
 * Throws when a configured folder has no photos, so a typo or an empty folder never ships silently.
 */
export function buildAlbums(
  folders: readonly string[],
  images: readonly CloudinaryImage[],
): Record<string, AlbumPhoto[]> {
  const albums = Object.fromEntries(
    folders.map((folder) => [
      folder,
      images
        .filter((image) => image.folder === folder)
        .toSorted((first, second) => naturalOrder.compare(first.filename, second.filename))
        .map(toAlbumPhoto),
    ]),
  );
  const emptyFolders = folders.filter((folder) => albums[folder].length === 0);
  if (emptyFolders.length > 0) {
    throw new Error(`No photos in these Cloudinary folders: ${emptyFolders.join(", ")}`);
  }
  return albums;
}
