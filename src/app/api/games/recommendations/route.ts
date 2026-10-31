import { games } from "@/content/games";
import { getDatabase } from "@/lib/db/client";
import { getClientIp, hashIp } from "@/lib/db/ip-hash";
import { checkRateLimit } from "@/lib/db/rate-limit";
import { getIgdbClient } from "@/lib/games/igdb-server";
import { createRecommendationRoute } from "@/lib/games/recommendation-routes";
import { readRecommendations, submitRecommendation } from "@/lib/games/recommendation-stats";

export const dynamic = "force-dynamic";

/** Only games Will has played or is playing can be named in "because you liked". */
const likeableSlugs = new Set(
  games.filter((game) => game.list !== "wishlist").map((game) => game.slug),
);

const recommendationRoute = createRecommendationRoute({
  hashClientIp: (headers) => hashIp(getClientIp(headers)),
  checkRateLimit: (ipHash, rule) => checkRateLimit(getDatabase(), ipHash, rule),
  getGame: async (igdbId) => getIgdbClient().getGame(igdbId),
  isLikeableGame: (slug) => likeableSlugs.has(slug),
  submitRecommendation: (submission) => submitRecommendation(getDatabase(), submission),
  readRecommendations: (browserId) => readRecommendations(getDatabase(), browserId),
});

export const GET = recommendationRoute.GET;
export const POST = recommendationRoute.POST;
