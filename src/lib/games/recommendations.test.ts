import { describe, expect, it } from "vitest";
import { sortRecommendations } from "./recommendations";

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
