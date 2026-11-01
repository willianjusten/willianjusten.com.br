import { describe, expect, it } from "vitest";
import type { ShelfGame } from "../lib/games-board";
import type { RecommendationView } from "../lib/recommendations";
import { buildShelfCases } from "../lib/shelf-cases";

const labels = {
  sticker: "recommended ×{count}",
  pendingSticker: "pending",
  pendingNote: "Waiting for approval",
  soon: "SOON",
  showGame: "Show {title}",
};

function buildGame(overrides: Partial<ShelfGame>): ShelfGame {
  return {
    slug: "a",
    title: "A",
    platform: "ps5",
    list: "played",
    year: 2025,
    note: "",
    tone: "#000000",
    coverUrl: null,
    ...overrides,
  };
}

function buildRecommendation(overrides: Partial<RecommendationView>): RecommendationView {
  return {
    id: 1,
    title: "R",
    year: 2024,
    platform: "xbox",
    coverUrl: null,
    status: "approved",
    count: 3,
    mine: false,
    createdAt: "2026-10-01T00:00:00.000Z",
    ...overrides,
  };
}

const emptySources = {
  platform: "all" as const,
  games: [],
  recommendations: [],
  reactionCounts: {},
  myReactions: new Set<string>(),
  labels,
};

describe("buildShelfCases", () => {
  it("keeps the curated games on the tab and platform, with their reactions", () => {
    const cases = buildShelfCases({
      ...emptySources,
      list: "played",
      platform: "ps5",
      games: [
        buildGame({ slug: "kept", rating: 4 }),
        buildGame({ slug: "other-platform", platform: "rog" }),
        buildGame({ slug: "other-list", list: "playing" }),
      ],
      reactionCounts: { kept: 7 },
      myReactions: new Set(["kept"]),
    });

    expect(cases).toHaveLength(1);
    expect(cases[0]).toMatchObject({
      key: "kept",
      badgeText: "2025",
      rating: 4,
      showLabel: "Show A",
      reaction: { pressed: true, count: 7, isEnabled: true },
      canRecommendSimilar: true,
    });
  });

  it("badges wishlist games as upcoming and offers no similar recommendation", () => {
    const [wishlistCase] = buildShelfCases({
      ...emptySources,
      list: "wishlist",
      games: [buildGame({ list: "wishlist", year: undefined, rating: 5 })],
    });

    expect(wishlistCase).toMatchObject({ badgeText: "SOON", rating: null, year: null });
    expect(wishlistCase?.canRecommendSimilar).toBe(false);
  });

  it("stickers approved recommendations with their count and disables votes on pending ones", () => {
    const [approved, pending] = buildShelfCases({
      ...emptySources,
      list: "recommended",
      recommendations: [
        buildRecommendation({ id: 1, count: 3 }),
        buildRecommendation({ id: 2, status: "pending", count: 1 }),
      ],
    });

    expect(approved).toMatchObject({
      entry: { sticker: "recommended ×3" },
      badgeText: "×3",
      reaction: { isEnabled: true, target: { kind: "recommendation", recommendationId: 1 } },
    });
    expect(pending).toMatchObject({
      entry: { sticker: "pending" },
      note: "Waiting for approval",
      reaction: { isEnabled: false },
    });
  });
});
