import { describe, expect, it } from "vitest";
import { buildShelfEntries } from "./games-board";
import { games } from "./games";

const [firstGame] = games;

describe("games board", () => {
  it("gives a game its IGDB cover when one was fetched", () => {
    const [entry] = buildShelfEntries([firstGame], { [firstGame.slug]: coverFor("co5vmg") }, "en");

    expect(entry.coverUrl).toBe(
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co5vmg.jpg",
    );
  });

  it("leaves the cover empty when none was fetched, so the tone shows instead", () => {
    const [entry] = buildShelfEntries([firstGame], {}, "en");

    expect(entry.coverUrl).toBeNull();
    expect(entry.tone).toBe(firstGame.tone);
  });

  it("picks the note in the visitor's language", () => {
    const [english] = buildShelfEntries([firstGame], {}, "en");
    const [portuguese] = buildShelfEntries([firstGame], {}, "pt");

    expect(english.note).toBe(firstGame.note.en);
    expect(portuguese.note).toBe(firstGame.note.pt);
  });
});

function coverFor(coverImageId: string) {
  return { igdbId: 1, igdbTitle: "Game", coverImageId, fetchedAt: "2026-10-31T00:00:00.000Z" };
}
