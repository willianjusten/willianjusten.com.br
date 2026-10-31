import { z } from "zod";

const monthPattern = /^\d{4}-(0[1-9]|1[0-2])$/;

const trackSchema = z.object({
  /** Stable key that joins the track to its entry in the generated previews file. */
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  artist: z.string().min(1),
  album: z.string().min(1),
  /** The month the track was on repeat, as `YYYY-MM`. */
  month: z.string().regex(monthPattern),
  /** Hand-entered links. Apple Music comes from the preview script instead. */
  youtubeMusicUrl: z.url().optional(),
  spotifyUrl: z.url().optional(),
});

export const musicSchema = z
  .object({
    /** Id of the track shown on the record player. */
    songOfTheMoment: z.string(),
    tracks: z.array(trackSchema).min(1),
  })
  .refine(
    (music) => music.tracks.some((track) => track.id === music.songOfTheMoment),
    "songOfTheMoment must be the id of a listed track",
  )
  .refine(
    (music) => new Set(music.tracks.map((track) => track.id)).size === music.tracks.length,
    "track ids must be unique",
  );

export type MusicTrack = z.output<typeof trackSchema>;
export type Music = z.output<typeof musicSchema>;

/**
 * Draft selection seeded from `data/legacy/song-candidates.json`. Will picks which stay.
 * Spotify links are the ones already used in the old posts (albums where no track link existed).
 */
export const musicData: z.input<typeof musicSchema> = {
  songOfTheMoment: "bmth-lost",
  tracks: [
    {
      id: "bmth-lost",
      title: "LosT",
      artist: "Bring Me The Horizon",
      album: "POST HUMAN: NeX GEn",
      month: "2024-12",
      spotifyUrl: "https://open.spotify.com/album/1k7OXnGQPV4zF3seDwRroD",
    },
    {
      id: "post-malone-chemical",
      title: "Chemical",
      artist: "Post Malone",
      album: "Austin",
      month: "2023-12",
      spotifyUrl: "https://open.spotify.com/album/1F9LY06gadScF4g3g3BrDC",
    },
    {
      id: "transatlanticism",
      title: "Transatlanticism",
      artist: "Death Cab for Cutie",
      album: "Transatlanticism",
      month: "2021-10",
      spotifyUrl: "https://open.spotify.com/album/4jQW2mhMH3TxtAOol3Djuf",
    },
    {
      id: "silverchair-abuse-me",
      title: "Abuse Me",
      artist: "Silverchair",
      album: "Freak Show",
      month: "2021-09",
      spotifyUrl: "https://open.spotify.com/album/511p6iaCuK8Sr0BYdpcfkq",
    },
    {
      id: "home-edward-sharpe",
      title: "Home",
      artist: "Edward Sharpe & The Magnetic Zeros",
      album: "Up from Below",
      month: "2019-12",
      spotifyUrl: "https://open.spotify.com/track/7w5cxTEzp1rfV3KCy0Bd5N",
    },
    {
      id: "tool-pneuma",
      title: "Pneuma",
      artist: "Tool",
      album: "Fear Inoculum",
      month: "2019-09",
      spotifyUrl: "https://open.spotify.com/album/7acEciVtnuTzmwKptkjth5",
    },
    {
      id: "alice-in-chains-rooster",
      title: "Rooster",
      artist: "Alice in Chains",
      album: "MTV Unplugged",
      month: "2019-07",
      spotifyUrl: "https://open.spotify.com/album/5PdgIAHzwDvTZRjIGSQGtN",
    },
    {
      id: "war-on-drugs-pain",
      title: "Pain",
      artist: "The War on Drugs",
      album: "Lost in the Dream",
      month: "2018-10",
      spotifyUrl: "https://open.spotify.com/track/59P1nrdEImkAKa1nyW9X2e",
    },
    {
      id: "foo-fighters-run",
      title: "Run",
      artist: "Foo Fighters",
      album: "Concrete and Gold",
      month: "2017-09",
      spotifyUrl: "https://open.spotify.com/album/6KMkuqIwKkwUhUYRPL6dUc",
    },
  ],
};

export const music: Music = musicSchema.parse(musicData);
