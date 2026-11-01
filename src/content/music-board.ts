import type { Music, MusicTrack } from "./music";
import type { PreviewEntry } from "./music-preview-schema";

export type PlayableTrack = MusicTrack & {
  /** The curated link, or a YouTube Music search for the track when none is curated. */
  youtubeMusicUrl: string;
  /** Absent when no provider had a preview; the play control is then disabled. */
  previewUrl?: string;
  appleMusicUrl?: string;
};

export type MusicBoard = {
  songOfTheMoment: PlayableTrack;
  /** Every other track, newest month first. */
  pastTracks: PlayableTrack[];
};

function youtubeMusicSearchUrl(track: MusicTrack): string {
  const searchUrl = new URL("https://music.youtube.com/search");
  searchUrl.searchParams.set("q", `${track.artist} ${track.title}`);
  return searchUrl.toString();
}

/** Joins the curated tracks with the generated preview data and splits current from past. */
export function buildMusicBoard(music: Music, previews: Record<string, PreviewEntry>): MusicBoard {
  const playableTracks: PlayableTrack[] = music.tracks.map((track) => ({
    ...track,
    youtubeMusicUrl: track.youtubeMusicUrl ?? youtubeMusicSearchUrl(track),
    previewUrl: previews[track.id]?.previewUrl,
    appleMusicUrl: previews[track.id]?.appleMusicUrl,
  }));

  const songOfTheMoment = playableTracks.find((track) => track.id === music.songOfTheMoment);
  if (!songOfTheMoment) throw new Error(`Unknown song of the moment "${music.songOfTheMoment}"`);

  const pastTracks = playableTracks
    .filter((track) => track.id !== songOfTheMoment.id)
    .sort((first, second) => second.month.localeCompare(first.month));

  return { songOfTheMoment, pastTracks };
}
