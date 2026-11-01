import { describe, expect, it } from "vitest";
import { buildRecommendationViews } from "../server/recommendation-stats";

const CREATED_AT = new Date("2026-10-31T12:00:00Z");

function recommendationRow(platform: string) {
  return {
    id: 1,
    igdbId: 10,
    title: "Hades",
    year: 2020,
    platform,
    coverImageId: null,
    status: "approved" as const,
    createdAt: CREATED_AT,
  };
}

const vote = { recommendationId: 1, browserId: "browser-a", createdAt: CREATED_AT };

describe("buildRecommendationViews", () => {
  it("shows a recommendation saved as PC on the ROG Ally X shelf", () => {
    const [view] = buildRecommendationViews([recommendationRow("pc")], [vote], undefined);

    expect(view?.platform).toBe("rog");
  });

  it("drops a recommendation saved with a platform the shelf does not know", () => {
    expect(buildRecommendationViews([recommendationRow("dreamcast")], [vote], undefined)).toEqual(
      [],
    );
  });
});
