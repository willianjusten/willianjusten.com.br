import { z } from "zod";
import type { RateLimitRule } from "@/lib/db/rate-limit";
import {
  consumeRateLimit,
  invalidBodyResponse,
  NO_STORE,
  parseJsonBody,
  type RateLimitGuardDependencies,
} from "@/lib/api/rate-limit-guard";
import { browserIdSchema, readBrowserIdParam } from "./browser-id-param";
import type { ReactionSnapshot } from "./reaction-stats";

/** One hourly budget for a visitor's reactions and recommendation +1s combined. */
export const REACTION_RATE_LIMIT: RateLimitRule = {
  routeKey: "game-reactions",
  maxHits: 20,
  windowInSeconds: 60 * 60,
};

const reactionBodySchema = z.object({
  gameSlug: z.string().min(1).max(80),
  browserId: browserIdSchema,
  reacted: z.boolean(),
});

export type ReactionRouteDependencies = RateLimitGuardDependencies & {
  isKnownGame: (gameSlug: string) => boolean;
  setReaction: (
    gameSlug: string,
    browserId: string,
    reacted: boolean,
  ) => Promise<{ count: number }>;
  readReactions: (browserId: string | undefined) => Promise<ReactionSnapshot>;
};

/** Request logic kept free of Next and Neon so the route file stays a thin wiring layer. */
export function createReactionRoute(dependencies: ReactionRouteDependencies) {
  return {
    async GET(request: Request): Promise<Response> {
      const snapshot = await dependencies.readReactions(readBrowserIdParam(request));
      return Response.json(snapshot, { headers: NO_STORE });
    },

    async POST(request: Request): Promise<Response> {
      const body = await parseJsonBody(request, reactionBodySchema);
      if (!body.success || !dependencies.isKnownGame(body.data.gameSlug)) {
        return invalidBodyResponse();
      }

      const rejection = await consumeRateLimit(dependencies, request, REACTION_RATE_LIMIT);
      if (rejection) {
        return rejection;
      }

      const { gameSlug, browserId, reacted } = body.data;
      const result = await dependencies.setReaction(gameSlug, browserId, reacted);
      return Response.json({ gameSlug, reacted, count: result.count }, { headers: NO_STORE });
    },
  };
}
