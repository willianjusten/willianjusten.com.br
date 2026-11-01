import { getDatabase } from "@/lib/db/client";
import { getClientIp, hashIp } from "@/lib/db/ip-hash";
import { checkRateLimit } from "@/lib/db/rate-limit";
import { getIgdbClient } from "@/sections/games/server/igdb-server";
import { createRecommendationRoute } from "@/sections/games/server/recommendation-routes";
import {
  readRecommendations,
  submitRecommendation,
} from "@/sections/games/server/recommendation-stats";

export const dynamic = "force-dynamic";

const recommendationRoute = createRecommendationRoute({
  hashClientIp: (headers) => hashIp(getClientIp(headers)),
  checkRateLimit: (ipHash, rule) => checkRateLimit(getDatabase(), ipHash, rule),
  getGame: async (igdbId) => getIgdbClient().getGame(igdbId),
  submitRecommendation: (submission) => submitRecommendation(getDatabase(), submission),
  readRecommendations: (browserId) => readRecommendations(getDatabase(), browserId),
});

export const GET = recommendationRoute.GET;
export const POST = recommendationRoute.POST;
