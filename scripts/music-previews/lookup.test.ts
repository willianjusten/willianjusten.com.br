import { describe, expect, it } from "vitest";
import { findPreview, type JsonFetcher } from "./lookup";

const track = { id: "tool-pneuma", title: "Pneuma", artist: "Tool" };
const now = "2026-01-01T00:00:00.000Z";

function fetcherFor(responses: Record<string, unknown>): JsonFetcher {
  return async (url) => {
    const match = Object.entries(responses).find(([urlPart]) => url.includes(urlPart));
    if (!match) throw new Error(`unexpected request ${url}`);
    return match[1];
  };
}

describe("findPreview", () => {
  it("returns the iTunes preview and Apple Music link for a matching result", async () => {
    const fetchJson = fetcherFor({
      "itunes.apple.com": {
        results: [
          {
            trackName: "Pneuma",
            artistName: "Tool",
            previewUrl: "https://audio.example/pneuma.m4a",
            trackViewUrl: "https://music.apple.com/us/album/pneuma/1?i=2",
            artworkUrl100: "https://img.example/100x100bb.jpg",
          },
        ],
      },
    });

    const entry = await findPreview(track, fetchJson, now);

    expect(entry).toEqual({
      source: "itunes",
      previewUrl: "https://audio.example/pneuma.m4a",
      appleMusicUrl: "https://music.apple.com/us/album/pneuma/1?i=2",
      artworkUrl: "https://img.example/100x100bb.jpg",
      fetchedAt: now,
    });
  });

  it("ignores iTunes results by a different artist and falls back to Deezer", async () => {
    const fetchJson = fetcherFor({
      "itunes.apple.com": {
        results: [
          {
            trackName: "Pneuma",
            artistName: "Some Cover Band",
            previewUrl: "https://audio.example/cover.m4a",
            trackViewUrl: "https://music.apple.com/cover",
          },
        ],
      },
      "api.deezer.com": {
        data: [
          {
            title: "Pneuma",
            artist: { name: "Tool" },
            preview: "https://cdn.example/pneuma.mp3",
            album: { cover_medium: "https://img.example/cover.jpg" },
          },
        ],
      },
    });

    const entry = await findPreview(track, fetchJson, now);

    expect(entry?.source).toBe("deezer");
    expect(entry?.previewUrl).toBe("https://cdn.example/pneuma.mp3");
    expect(entry?.appleMusicUrl).toBeUndefined();
  });

  it("falls back to Deezer when iTunes fails", async () => {
    const fetchJson: JsonFetcher = async (url) => {
      if (url.includes("itunes")) throw new Error("rate limited");
      return {
        data: [{ title: "Pneuma", artist: { name: "Tool" }, preview: "https://cdn.example/p.mp3" }],
      };
    };

    expect((await findPreview(track, fetchJson, now))?.source).toBe("deezer");
  });

  it("returns null when no provider has a matching preview", async () => {
    const fetchJson = fetcherFor({
      "itunes.apple.com": { results: [] },
      "api.deezer.com": { data: [] },
    });

    expect(await findPreview(track, fetchJson, now)).toBeNull();
  });
});
