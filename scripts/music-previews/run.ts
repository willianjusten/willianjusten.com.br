/**
 * Run by hand: `pnpm music:previews` (add `--refresh` to ignore the cache).
 * Looks up a 30 second preview and Apple Music link for every curated track and writes
 * src/content/generated/music-previews.json. Tracks already in that file are skipped, which
 * keeps us under the iTunes limit of about 20 requests per minute.
 */
import { readFile, writeFile } from "node:fs/promises";
import { music } from "../../src/content/music.ts";
import { previewsFileSchema, type PreviewEntry } from "../../src/content/music-preview-schema.ts";
import { findPreview, type JsonFetcher } from "./lookup.ts";

const OUTPUT_PATH = new URL("../../src/content/generated/music-previews.json", import.meta.url);
/** 3.2s between tracks keeps us at about 18 iTunes requests per minute. */
const DELAY_BETWEEN_TRACKS_IN_MS = 3200;

const fetchJson: JsonFetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} for ${url}`);
  return response.json();
};

function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

const shouldRefresh = process.argv.includes("--refresh");
const cache: Record<string, PreviewEntry> = shouldRefresh
  ? {}
  : previewsFileSchema.parse(JSON.parse(await readFile(OUTPUT_PATH, "utf8")));

const previews: Record<string, PreviewEntry> = {};
const missingTrackIds: string[] = [];
let requestCount = 0;

for (const track of music.tracks) {
  const cachedEntry = cache[track.id];
  if (cachedEntry) {
    previews[track.id] = cachedEntry;
    console.log(`cached   ${track.id}`);
    continue;
  }

  if (requestCount > 0) await sleep(DELAY_BETWEEN_TRACKS_IN_MS);
  requestCount += 1;

  const entry = await findPreview(track, fetchJson, new Date().toISOString());
  if (entry) {
    previews[track.id] = entry;
    console.log(`${entry.source.padEnd(8)} ${track.id}`);
  } else {
    missingTrackIds.push(track.id);
    console.log(`MISSING  ${track.id}`);
  }
}

await writeFile(OUTPUT_PATH, `${JSON.stringify(previews, null, 2)}\n`);
if (missingTrackIds.length > 0) {
  console.warn(`No preview found for: ${missingTrackIds.join(", ")}`);
}
