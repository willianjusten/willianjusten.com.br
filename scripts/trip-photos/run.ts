/**
 * Run by hand: `pnpm places:photos`.
 * Reads every photo in the Cloudinary folders listed in src/content/places.ts and writes
 * src/content/generated/trip-photos.json with sizes, EXIF and a blur placeholder per photo.
 * Fails when a listed folder is missing or empty.
 */
import { writeFile } from "node:fs/promises";
import { tripPhotosFileSchema, type TripPhoto } from "../../src/content/trip-photo-schema.ts";
import { places } from "../../src/content/places.ts";
import { buildAlbums, type CloudinaryImage } from "./album.ts";

const OUTPUT_PATH = new URL("../../src/content/generated/trip-photos.json", import.meta.url);
/** The Search API caps a page at 500 results. */
const SEARCH_PAGE_SIZE = 500;
/** A 16px wide WebP without the colour profile stays around 100 bytes; next/image blurs it on screen. */
const BLUR_TRANSFORMATION = "w_16,q_40,f_webp,fl_strip_profile";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
if (!cloudName || !apiKey || !apiSecret) {
  throw new Error(
    "CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET must be set (see README).",
  );
}
const authorization = `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}`;

type SearchResource = Omit<CloudinaryImage, "folder" | "context"> & {
  folder?: string;
  /** Set instead of `folder` on accounts in dynamic folder mode. */
  asset_folder?: string;
  /** The Search API returns context flat; the Admin API nests it under `custom`. */
  context?: Record<string, string | Record<string, string>>;
};
type SearchPage = { resources: SearchResource[]; next_cursor?: string };

function readContext(context: SearchResource["context"]): Record<string, string> {
  if (!context) return {};
  const fields = typeof context.custom === "object" ? context.custom : context;
  return Object.fromEntries(
    Object.entries(fields).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
}

function toCloudinaryImage(resource: SearchResource): CloudinaryImage {
  return {
    public_id: resource.public_id,
    folder: resource.asset_folder ?? resource.folder ?? "",
    filename: resource.filename,
    width: resource.width,
    height: resource.height,
    image_metadata: resource.image_metadata,
    context: readContext(resource.context),
  };
}

async function searchFolders(folders: string[]): Promise<CloudinaryImage[]> {
  const expression = folders.map((folder) => `folder="${folder}"`).join(" OR ");
  const images: CloudinaryImage[] = [];
  let cursor: string | undefined;
  do {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/search`, {
      method: "POST",
      headers: { Authorization: authorization, "Content-Type": "application/json" },
      body: JSON.stringify({
        expression,
        max_results: SEARCH_PAGE_SIZE,
        with_field: ["context", "image_metadata"],
        next_cursor: cursor,
      }),
    });
    if (!response.ok) {
      throw new Error(`Cloudinary search failed: HTTP ${response.status} ${await response.text()}`);
    }
    const page = (await response.json()) as SearchPage;
    images.push(...page.resources.map(toCloudinaryImage));
    cursor = page.next_cursor;
  } while (cursor);
  return images;
}

async function fetchBlurDataUrl(publicId: string): Promise<string> {
  const url = `https://res.cloudinary.com/${cloudName}/image/upload/${BLUR_TRANSFORMATION}/${publicId}`;
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Blur placeholder failed for ${publicId}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  return `data:image/webp;base64,${bytes.toString("base64")}`;
}

const folders = places.flatMap((place) => place.cloudinaryFolders ?? []);
const albumsWithoutBlur = buildAlbums(folders, await searchFolders(folders));

const albums: Record<string, TripPhoto[]> = {};
for (const [folder, photos] of Object.entries(albumsWithoutBlur)) {
  albums[folder] = await Promise.all(
    photos.map(async (photo) => ({
      ...photo,
      blurDataUrl: await fetchBlurDataUrl(photo.publicId),
    })),
  );
  console.log(`${folder}: ${photos.length} photos`);
}

const file = tripPhotosFileSchema.parse({ cloudName, albums });
await writeFile(OUTPUT_PATH, `${JSON.stringify(file, null, 2)}\n`);
console.log(`\nSaved ${Object.values(albums).flat().length} photos to ${OUTPUT_PATH.pathname}.`);
