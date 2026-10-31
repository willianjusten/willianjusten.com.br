import { describe, expect, it } from "vitest";
import { music } from "./music";
import { buildMusicBoard } from "./music-board";
import { musicPreviews } from "./music-previews";

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

  it("leaves the preview empty for a track the script found nothing for", () => {
    const board = buildMusicBoard(music, {});

    expect(board.songOfTheMoment.previewUrl).toBeUndefined();
  });
});
