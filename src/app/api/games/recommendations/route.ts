import { visitorRateLimitGuard } from "@/lib/api/visitor-rate-limit";
import { getDatabase } from "@/lib/db/client";
import { getIgdbClient } from "@/sections/games/server/igdb-server";
import { createRecommendationRoute } from "@/sections/games/server/recommendation-routes";
import {
  readRecommendations,
  submitRecommendation,
} from "@/sections/games/server/recommendation-stats";

export const dynamic = "force-dynamic";

const recommendationRoute = createRecommendationRoute({
  ...visitorRateLimitGuard,
  getGame: async (igdbId) => getIgdbClient().getGame(igdbId),
  submitRecommendation: (submission) => submitRecommendation(getDatabase(), submission),
  readRecommendations: (browserId) => readRecommendations(getDatabase(), browserId),
});

export const GET = recommendationRoute.GET;
export const POST = recommendationRoute.POST;
