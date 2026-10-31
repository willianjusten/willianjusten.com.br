import { z } from "zod";
import type { RateLimitResult, RateLimitRule } from "@/lib/db/rate-limit";
import type { ReactionSnapshot } from "./reaction-stats";

export const REACTION_RATE_LIMIT: RateLimitRule = {
  routeKey: "game-reactions",
  maxHits: 20,
  windowInSeconds: 60 * 60,
};

const browserIdSchema = z.uuid();

const reactionBodySchema = z.object({
  gameSlug: z.string().min(1).max(80),
  browserId: browserIdSchema,
  reacted: z.boolean(),
});

export type ReactionRouteDependencies = {
  hashClientIp: (headers: Headers) => string;
  checkRateLimit: (ipHash: string, rule: RateLimitRule) => Promise<RateLimitResult>;
  isKnownGame: (gameSlug: string) => boolean;
  setReaction: (gameSlug: string, browserId: string, reacted: boolean) => Promise<{ count: number }>;
  readReactions: (browserId: string | undefined) => Promise<ReactionSnapshot>;
};

const NO_STORE = { "Cache-Control": "no-store" };

/** Request logic kept free of Next and Neon so the route file stays a thin wiring layer. */
export function createReactionRoute(dependencies: ReactionRouteDependencies) {
  return {
    async GET(request: Request): Promise<Response> {
      const rawBrowserId = new URL(request.url).searchParams.get("browserId");
      const browserId = browserIdSchema.safeParse(rawBrowserId);
      const snapshot = await dependencies.readReactions(
        browserId.success ? browserId.data : undefined,
      );
      return Response.json(snapshot, { headers: NO_STORE });
    },

    async POST(request: Request): Promise<Response> {
      const ipHash = dependencies.hashClientIp(request.headers);
      const limit = await dependencies.checkRateLimit(ipHash, REACTION_RATE_LIMIT);
      if (!limit.allowed) {
        return Response.json(
          { error: "rate_limited" },
          {
            status: 429,
            headers: { ...NO_STORE, "Retry-After": String(limit.retryAfterInSeconds) },
          },
        );
      }

      const body = reactionBodySchema.safeParse(await request.json().catch(() => null));
      if (!body.success || !dependencies.isKnownGame(body.data.gameSlug)) {
        return Response.json({ error: "invalid_body" }, { status: 400, headers: NO_STORE });
      }

      const { gameSlug, browserId, reacted } = body.data;
      const result = await dependencies.setReaction(gameSlug, browserId, reacted);
      return Response.json({ gameSlug, reacted, count: result.count }, { headers: NO_STORE });
    },
  };
}
