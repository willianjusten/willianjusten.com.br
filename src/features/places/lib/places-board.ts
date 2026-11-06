import type { Locale } from "next-intl";
import type { Place } from "@/content/places";
import type { PhotoExif, TripPhoto, TripPhotosFile } from "@/content/trip-photo-schema";

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
  /** Visit years in order; empty without an album. */
  years: number[];
  lat: number;
  lon: number;
  isHome: boolean;
  /** Stand-in pin card colour while the place has no album photo. */
  color: string;
  caption?: string;
  unsplashUrl: string;
  /** In album order; empty without an album. */
  photos: AlbumPhoto[];
};

export function formatPhotoLine({ title, exif }: Pick<TripPhoto, "title" | "exif">): PhotoLine {
  const settings = EXIF_ORDER.flatMap((field) => (exif?.[field] ? [exif[field]] : [])).join(
    LINE_SEPARATOR,
  );
  const details = settings && title ? `${LINE_SEPARATOR.trimStart()}${settings}` : settings;
  return { ...(title ? { title } : {}), ...(details ? { details } : {}) };
}

function readFolderYear(folder: string): number {
  return Number(folder.slice(TRIP_FOLDER_PREFIX.length, TRIP_FOLDER_PREFIX.length + 4));
}

/** An open album: the place and the photo on show. */
export type AlbumPosition = { slug: string; photoIndex: number };

function placesWithPhotosOf(places: readonly GlobePlace[]): GlobePlace[] {
  return places.filter((place) => place.photos.length > 0);
}

/**
 * The next or previous place with photos, in content order, wrapping around at both ends of the
 * list. Undefined when no other place has photos.
 */
export function neighbourPlace(
  places: readonly GlobePlace[],
  slug: string,
  direction: 1 | -1,
): GlobePlace | undefined {
  const placesWithPhotos = placesWithPhotosOf(places);
  const placeIndex = placesWithPhotos.findIndex((place) => place.slug === slug);
  if (placeIndex === -1 || placesWithPhotos.length < 2) return undefined;
  const count = placesWithPhotos.length;
  return placesWithPhotos[(placeIndex + direction + count) % count];
}

/**
 * Moves one photo forward or back. Past either end of an album it carries on into the next or
 * previous place with photos, in content order, wrapping around at both ends of the list.
 */
export function stepAlbum(
  places: readonly GlobePlace[],
  position: AlbumPosition,
  direction: 1 | -1,
): AlbumPosition {
  const place = placesWithPhotosOf(places).find((candidate) => candidate.slug === position.slug);
  if (!place) return position;
  const photoIndex = position.photoIndex + direction;
  if (photoIndex >= 0 && photoIndex < place.photos.length) return { slug: place.slug, photoIndex };
  const neighbour = neighbourPlace(places, place.slug, direction) ?? place;
  return { slug: neighbour.slug, photoIndex: direction === 1 ? 0 : neighbour.photos.length - 1 };
}

/** Whether stepping can show anything other than the current photo. */
export function hasPhotosToStep(places: readonly GlobePlace[]): boolean {
  return places.reduce((count, place) => count + place.photos.length, 0) > 1;
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
        src: `https://res.cloudinary.com/${tripPhotos.cloudName}/image/upload/${photo.publicId}`,
        width: photo.width,
        height: photo.height,
        blurDataUrl: photo.blurDataUrl,
        line: formatPhotoLine(photo),
      })),
    };
  });
}
