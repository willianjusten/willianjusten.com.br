import { visitorRateLimitGuard } from "@/lib/api/visitor-rate-limit";
import { getDatabase } from "@/lib/db/client";
import { getIgdbClient } from "@/features/games/server/igdb-server";
import { createRecommendationRoute } from "@/features/games/server/recommendation-routes";
import {
  readRecommendations,
  submitRecommendation,
} from "@/features/games/server/recommendation-stats";

export const dynamic = "force-dynamic";

const recommendationRoute = createRecommendationRoute({
  ...visitorRateLimitGuard,
  getGame: async (igdbId) => getIgdbClient().getGame(igdbId),
  submitRecommendation: (submission) => submitRecommendation(getDatabase(), submission),
  readRecommendations: (browserId) => readRecommendations(getDatabase(), browserId),
});

export const GET = recommendationRoute.GET;
export const POST = recommendationRoute.POST;
