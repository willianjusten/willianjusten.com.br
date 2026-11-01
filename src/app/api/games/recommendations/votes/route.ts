import { visitorRateLimitGuard } from "@/lib/api/visitor-rate-limit";
import { getDatabase } from "@/lib/db/client";
import { createVoteRoute } from "@/features/games/server/recommendation-routes";
import { setRecommendationVote } from "@/features/games/server/recommendation-stats";

export const dynamic = "force-dynamic";

const voteRoute = createVoteRoute({
  ...visitorRateLimitGuard,
  setRecommendationVote: (recommendationId, browserId, voted) =>
    setRecommendationVote(getDatabase(), recommendationId, browserId, voted),
});

export const POST = voteRoute.POST;
