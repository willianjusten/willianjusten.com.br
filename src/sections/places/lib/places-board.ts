import type { Locale } from "next-intl";
import type { Place } from "@/content/places";
import type { PhotoExif, TripPhoto, TripPhotosFile } from "@/content/trip-photo-schema";

/** Caps the size next/image fetches from Cloudinary; the originals are up to 6000px wide. */
const MAX_SOURCE_WIDTH_IN_PIXELS = 2400;
const COUNTER_DIGITS = 2;
const TRIP_FOLDER_PREFIX = "trips/";
const LINE_SEPARATOR = " · ";
const EXIF_ORDER: (keyof PhotoExif)[] = [
  "focalLength",
  "aperture",
  "shutter",
  "iso",
  "camera",
  "lens",
  "year",
];

/** The photo title and its camera settings; the settings start with "· " only when a title precedes them. */
type PhotoLine = { title?: string; details?: string };

export type AlbumPhoto = {
  src: string;
  width: number;
  height: number;
  blurDataUrl: string;
  line: PhotoLine;
};

export type GlobePlace = {
  slug: string;
  name: string;
  country: string;
  /** Visit years in order; empty for home. */
  years: number[];
  lat: number;
  lon: number;
  isHome: boolean;
  /** Stand-in pin card colour while the place has no album photo. */
  color: string;
  caption?: string;
  unsplashUrl: string;
  /** In album order; empty for home. */
  photos: AlbumPhoto[];
};

export type PlaceCounters = { countries: string; cities: string; photos: string };

export function formatPhotoLine({ title, exif }: Pick<TripPhoto, "title" | "exif">): PhotoLine {
  const settings = EXIF_ORDER.flatMap((field) => (exif?.[field] ? [exif[field]] : [])).join(
    LINE_SEPARATOR,
  );
  const details = settings && title ? `${LINE_SEPARATOR.trimStart()}${settings}` : settings;
  return { ...(title ? { title } : {}), ...(details ? { details } : {}) };
}

function padCount(count: number): string {
  return String(count).padStart(COUNTER_DIGITS, "0");
}

/** The section header counts: home is where Will lives, not a trip, so it counts towards photos only. */
export function countPlaces(
  places: readonly (Pick<GlobePlace, "country" | "isHome"> & { photos: readonly unknown[] })[],
): PlaceCounters {
  const trips = places.filter((place) => !place.isHome);
  return {
    countries: padCount(new Set(trips.map((place) => place.country)).size),
    cities: padCount(trips.length),
    photos: padCount(places.reduce((total, place) => total + place.photos.length, 0)),
  };
}

function readFolderYear(folder: string): number {
  return Number(folder.slice(TRIP_FOLDER_PREFIX.length, TRIP_FOLDER_PREFIX.length + 4));
}

/** Moves through an album by `step` photos, wrapping at both ends. */
export function stepPhotoIndex(photoIndex: number, step: number, total: number): number {
  return (photoIndex + step + total) % total;
}

export function buildGlobePlaces(
  places: readonly Place[],
  tripPhotos: TripPhotosFile,
  locale: Locale,
): GlobePlace[] {
  return places.map((place) => {
    const folders = place.cloudinaryFolders ?? [];
    const album = folders.flatMap((folder) => tripPhotos.albums[folder] ?? []);
    return {
      slug: place.slug,
      name: place.name,
      country: place.country,
      years: folders.map(readFolderYear),
      lat: place.lat,
      lon: place.lon,
      isHome: place.isHome,
      color: place.color,
      ...(place.caption ? { caption: place.caption[locale] } : {}),
      unsplashUrl: place.unsplashUrl,
      photos: album.map((photo) => ({
        src: `https://res.cloudinary.com/${tripPhotos.cloudName}/image/upload/c_limit,w_${MAX_SOURCE_WIDTH_IN_PIXELS}/${photo.publicId}`,
        width: photo.width,
        height: photo.height,
        blurDataUrl: photo.blurDataUrl,
        line: formatPhotoLine(photo),
      })),
    };
  });
}
