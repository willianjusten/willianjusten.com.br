import type { PreviewEntry } from "../../src/content/music-preview-schema";

export type JsonFetcher = (url: string) => Promise<unknown>;

type TrackQuery = { id: string; title: string; artist: string };

type ItunesResult = {
  trackName?: string;
  artistName?: string;
  previewUrl?: string;
  trackViewUrl?: string;
  artworkUrl100?: string;
};

type DeezerResult = {
  title?: string;
  artist?: { name?: string };
  preview?: string;
  album?: { cover_medium?: string };
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Loose match both ways, so "Edward Sharpe & The Magnetic Zeros" matches the provider's spelling. */
function isSameText(wanted: string, found: string | undefined): boolean {
  if (!found) return false;
  const wantedText = normalize(wanted);
  const foundText = normalize(found);
  return foundText.includes(wantedText) || wantedText.includes(foundText);
}

function isMatch(track: TrackQuery, title?: string, artist?: string): boolean {
  return isSameText(track.title, title) && isSameText(track.artist, artist);
}

async function lookupItunes(
  track: TrackQuery,
  fetchJson: JsonFetcher,
  fetchedAt: string,
): Promise<PreviewEntry | null> {
  const term = encodeURIComponent(`${track.title} ${track.artist}`);
  const body = (await fetchJson(
    `https://itunes.apple.com/search?term=${term}&media=music&entity=song&limit=10`,
  )) as { results?: ItunesResult[] };

  const result = body.results?.find(
    (candidate) =>
      candidate.previewUrl && isMatch(track, candidate.trackName, candidate.artistName),
  );
  if (!result?.previewUrl) return null;

  return {
    source: "itunes",
    previewUrl: result.previewUrl,
    appleMusicUrl: result.trackViewUrl,
    artworkUrl: result.artworkUrl100,
    fetchedAt,
  };
}

async function lookupDeezer(
  track: TrackQuery,
  fetchJson: JsonFetcher,
  fetchedAt: string,
): Promise<PreviewEntry | null> {
  const query = encodeURIComponent(`track:"${track.title}" artist:"${track.artist}"`);
  const body = (await fetchJson(`https://api.deezer.com/search?q=${query}&limit=10`)) as {
    data?: DeezerResult[];
  };

  const result = body.data?.find(
    (candidate) => candidate.preview && isMatch(track, candidate.title, candidate.artist?.name),
  );
  if (!result?.preview) return null;

  return {
    source: "deezer",
    previewUrl: result.preview,
    artworkUrl: result.album?.cover_medium,
    fetchedAt,
  };
}

/** iTunes first (it also gives the Apple Music link), Deezer as the fallback. */
export async function findPreview(
  track: TrackQuery,
  fetchJson: JsonFetcher,
  fetchedAt: string,
): Promise<PreviewEntry | null> {
  try {
    const itunesEntry = await lookupItunes(track, fetchJson, fetchedAt);
    if (itunesEntry) return itunesEntry;
  } catch {
    // iTunes rate limits or errors fall through to Deezer.
  }

  try {
    return await lookupDeezer(track, fetchJson, fetchedAt);
  } catch {
    return null;
  }
}
