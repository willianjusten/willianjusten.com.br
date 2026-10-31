import { describe, expect, it } from "vitest";
import { buildRecommendationNote, sanitizeName, sortRecommendations } from "./recommendations";
import type { NoteLabels } from "./recommendations";

const labels: NoteLabels = {
  oneVisitor: "One visitor",
  visitors: "{count} visitors",
  namesAndMore: "{names} and {count} more",
  and: " and ",
  recommends: "{who} recommends this",
  recommend: "{who} recommend this",
  because: ", because I liked {game}.",
};

describe("sanitizeName", () => {
  it("trims, collapses spaces and caps at 30 characters", () => {
    expect(sanitizeName("  Ana   Maria ")).toBe("Ana Maria");
    expect(sanitizeName("x".repeat(50))).toBe("x".repeat(30));
  });

  it("returns null for empty names, links and blocked words", () => {
    expect(sanitizeName("   ")).toBeNull();
    expect(sanitizeName(undefined)).toBeNull();
    expect(sanitizeName("visit www.spam.com")).toBeNull();
    expect(sanitizeName("@someone")).toBeNull();
    expect(sanitizeName("Seu Merda")).toBeNull();
  });

  it("keeps real names that merely contain a blocked word as a substring", () => {
    expect(sanitizeName("Fagner")).toBe("Fagner");
    expect(sanitizeName("Computador Silva")).toBe("Computador Silva");
  });
});

describe("sortRecommendations", () => {
  it("puts the most recommended first and the newest first among ties", () => {
    const sorted = sortRecommendations([
      { id: 1, count: 1, createdAt: "2026-01-01" },
      { id: 2, count: 3, createdAt: "2026-01-02" },
      { id: 3, count: 1, createdAt: "2026-01-03" },
    ]);
    expect(sorted.map((item) => item.id)).toEqual([2, 3, 1]);
  });
});

describe("buildRecommendationNote", () => {
  it("names up to two people and counts the rest", () => {
    expect(
      buildRecommendationNote({ count: 3, names: ["Ana"], becauseSlug: "a" }, "Hades", labels),
    ).toBe("Ana and 2 more recommend this, because I liked Hades.");
    expect(
      buildRecommendationNote(
        { count: 2, names: ["Ana", "Leo"], becauseSlug: "a" },
        "Hades",
        labels,
      ),
    ).toBe("Ana and Leo recommend this, because I liked Hades.");
  });

  it("uses singular wording for one recommender", () => {
    expect(
      buildRecommendationNote({ count: 1, names: ["Ana"], becauseSlug: null }, undefined, labels),
    ).toBe("Ana recommends this.");
    expect(
      buildRecommendationNote({ count: 1, names: [], becauseSlug: null }, undefined, labels),
    ).toBe("One visitor recommends this.");
  });

  it("counts anonymous visitors", () => {
    expect(
      buildRecommendationNote({ count: 4, names: [], becauseSlug: "a" }, "Hades", labels),
    ).toBe("4 visitors recommend this, because I liked Hades.");
  });
});
