import { games } from "@/content/games";
import { getDatabase } from "@/lib/db/client";
import { getClientIp, hashIp } from "@/lib/db/ip-hash";
import { checkRateLimit } from "@/lib/db/rate-limit";
import { createReactionRoute } from "@/lib/games/reaction-route";
import { readReactions, setReaction } from "@/lib/games/reaction-stats";

export const dynamic = "force-dynamic";

const knownSlugs = new Set(games.map((game) => game.slug));

const reactionRoute = createReactionRoute({
  hashClientIp: (headers) => hashIp(getClientIp(headers)),
  checkRateLimit: (ipHash, rule) => checkRateLimit(getDatabase(), ipHash, rule),
  isKnownGame: (gameSlug) => knownSlugs.has(gameSlug),
  setReaction: (gameSlug, browserId, reacted) =>
    setReaction(getDatabase(), gameSlug, browserId, reacted),
  readReactions: (browserId) => readReactions(getDatabase(), browserId),
});

export const GET = reactionRoute.GET;
export const POST = reactionRoute.POST;
