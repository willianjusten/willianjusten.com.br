import { games } from "@/content/games";
import { visitorRateLimitGuard } from "@/lib/api/visitor-rate-limit";
import { getDatabase } from "@/lib/db/client";
import { createReactionRoute } from "@/features/games/server/reaction-route";
import { readReactions, setReaction } from "@/features/games/server/reaction-stats";

export const dynamic = "force-dynamic";

const knownSlugs = new Set(games.map((game) => game.slug));

const reactionRoute = createReactionRoute({
  ...visitorRateLimitGuard,
  isKnownGame: (gameSlug) => knownSlugs.has(gameSlug),
  setReaction: (gameSlug, browserId, reacted) =>
    setReaction(getDatabase(), gameSlug, browserId, reacted),
  readReactions: (browserId) => readReactions(getDatabase(), browserId),
});

export const GET = reactionRoute.GET;
export const POST = reactionRoute.POST;
