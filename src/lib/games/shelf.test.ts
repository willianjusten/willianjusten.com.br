import { describe, expect, it } from "vitest";
import type { Game } from "@/content/games";
import { countByList, countByPlatform, filterShelf } from "./shelf";

function buildGame(overrides: Partial<Game>): Game {
  return {
    slug: "a",
    title: "A",
    platform: "rog",
    list: "playing",
    year: 2026,
    note: { en: "n", pt: "n" },
    tone: "#000000",
    ...overrides,
  };
}

const games = [
  buildGame({ slug: "a", list: "playing", platform: "rog" }),
  buildGame({ slug: "b", list: "played", platform: "ps5" }),
  buildGame({ slug: "c", list: "played", platform: "rog" }),
  buildGame({ slug: "d", list: "wishlist", platform: "switch2" }),
];

describe("countByList", () => {
  it("counts each tab, with recommended supplied separately", () => {
    expect(countByList(games)).toEqual({ playing: 1, played: 2, wishlist: 1 });
  });
});

describe("countByPlatform", () => {
  it("counts per platform within the active list and totals under all", () => {
    expect(countByPlatform(games, "played")).toEqual({
      all: 2,
      ps5: 1,
      xbox: 0,
      switch2: 0,
      rog: 1,
    });
  });
});

describe("filterShelf", () => {
  it("returns the list in order for all platforms", () => {
    expect(filterShelf(games, "played", "all").map((game) => game.slug)).toEqual(["b", "c"]);
  });

  it("narrows by platform", () => {
    expect(filterShelf(games, "played", "rog").map((game) => game.slug)).toEqual(["c"]);
    expect(filterShelf(games, "wishlist", "rog")).toEqual([]);
  });
});
