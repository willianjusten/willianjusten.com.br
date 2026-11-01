import { describe, expect, it } from "vitest";
import { music } from "@/content/music";
import { buildMusicBoard } from "../lib/music-board";
import { musicPreviews } from "@/content/music-previews";

describe("music board", () => {
  it("gives every curated track a preview URL from the generated file", () => {
    const board = buildMusicBoard(music, musicPreviews);
    const allTracks = [board.songOfTheMoment, ...board.pastTracks];

    expect(allTracks).toHaveLength(music.tracks.length);
    for (const track of allTracks) {
      expect(track.previewUrl, `preview for ${track.id}`).toMatch(/^https:\/\//);
    }
  });

  it("keeps the song of the moment out of the past list and sorts it newest first", () => {
    const board = buildMusicBoard(music, musicPreviews);
    const months = board.pastTracks.map((track) => track.month);

    expect(board.pastTracks.map((track) => track.id)).not.toContain(board.songOfTheMoment.id);
    expect(months).toEqual([...months].sort().reverse());
  });

  it("falls back to a YouTube Music search when no YouTube Music link is curated", () => {
    const trackWithoutLink = { ...music.tracks[0], youtubeMusicUrl: undefined };
    const board = buildMusicBoard(
      { songOfTheMoment: trackWithoutLink.id, tracks: [trackWithoutLink] },
      {},
    );
    const searchUrl = new URL(board.songOfTheMoment.youtubeMusicUrl ?? "");

    expect(searchUrl.origin + searchUrl.pathname).toBe("https://music.youtube.com/search");
    expect(searchUrl.searchParams.get("q")).toBe(
      `${trackWithoutLink.artist} ${trackWithoutLink.title}`,
    );
  });

  it("keeps a curated YouTube Music link over the search fallback", () => {
    const curatedUrl = "https://music.youtube.com/watch?v=curated";
    const trackWithLink = { ...music.tracks[0], youtubeMusicUrl: curatedUrl };
    const board = buildMusicBoard(
      { songOfTheMoment: trackWithLink.id, tracks: [trackWithLink] },
      {},
    );

    expect(board.songOfTheMoment.youtubeMusicUrl).toBe(curatedUrl);
  });

  it("leaves the preview empty for a track the script found nothing for", () => {
    const board = buildMusicBoard(music, {});

    expect(board.songOfTheMoment.previewUrl).toBeUndefined();
  });
});
