import { describe, expect, it } from "vitest";
import { buildShelfEntries } from "./games-board";
import { games } from "./games";

const [firstGame] = games;
const gameWithNote = {
  ...firstGame,
  note: { en: "The couch and travel game of the month.", pt: "O jogo de sofá e de viagem do mês." },
};

describe("games board", () => {
  it("gives a game its IGDB cover when one was fetched", () => {
    const [entry] = buildShelfEntries([firstGame], { [firstGame.slug]: coverFor("co5vmg") }, "en");

    expect(entry.coverUrl).toBe(
      "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co5vmg.jpg",
    );
  });

  it("leaves the cover empty when none was fetched, so the tone shows instead", () => {
    const [entry] = buildShelfEntries([firstGame], {}, "en");

    expect(entry.coverUrl).toBeNull();
    expect(entry.tone).toBe(firstGame.tone);
  });

  it("picks the note in the visitor's language", () => {
    const [english] = buildShelfEntries([gameWithNote], {}, "en");
    const [portuguese] = buildShelfEntries([gameWithNote], {}, "pt");

    expect(english.note).toBe(gameWithNote.note?.en);
    expect(portuguese.note).toBe(gameWithNote.note?.pt);
  });

  it("leaves the note empty for a game without one, so the shelf hides the line", () => {
    const [entry] = buildShelfEntries([{ ...firstGame, note: undefined }], {}, "en");

    expect(entry.note).toBe("");
  });
});

function coverFor(coverImageId: string) {
  return { igdbId: 1, igdbTitle: "Game", coverImageId, fetchedAt: "2026-10-31T00:00:00.000Z" };
}
