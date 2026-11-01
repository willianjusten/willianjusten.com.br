import { getDatabase } from "@/lib/db/client";
import { getClientIp, hashIp } from "@/lib/db/ip-hash";
import { checkRateLimit } from "@/lib/db/rate-limit";
import { createVoteRoute } from "@/sections/games/server/recommendation-routes";
import { setRecommendationVote } from "@/sections/games/server/recommendation-stats";

export const dynamic = "force-dynamic";

const voteRoute = createVoteRoute({
  hashClientIp: (headers) => hashIp(getClientIp(headers)),
  checkRateLimit: (ipHash, rule) => checkRateLimit(getDatabase(), ipHash, rule),
  setRecommendationVote: (recommendationId, browserId, voted) =>
    setRecommendationVote(getDatabase(), recommendationId, browserId, voted),
});

export const POST = voteRoute.POST;
