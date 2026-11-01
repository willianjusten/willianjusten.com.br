import { describe, expect, it } from "vitest";
import { pickIgdbMatch } from "../match.ts";

function result(igdbId: number, title: string, coverImageId: string | null = `co${igdbId}`) {
  return { igdbId, title, year: 2024, platforms: [], coverImageId };
}

describe("pickIgdbMatch", () => {
  it("picks the result whose name matches the title, ignoring case and punctuation", () => {
    const results = [result(1, "Alan Wake"), result(2, "Alan Wake II"), result(3, "Alan Wake 2")];

    expect(pickIgdbMatch("alan wake 2", results)?.igdbId).toBe(3);
    expect(pickIgdbMatch("Crimson Desert", [result(9, "Crimson Desert!")])?.igdbId).toBe(9);
  });

  it("returns nothing when no result matches exactly, so a wrong cover is never saved", () => {
    expect(pickIgdbMatch("Alan Wake 2", [result(1, "Alan Wake")])).toBeNull();
  });

  it("skips a matching result that has no cover", () => {
    expect(pickIgdbMatch("Hades", [result(1, "Hades", null), result(2, "Hades")])?.igdbId).toBe(2);
  });
});
