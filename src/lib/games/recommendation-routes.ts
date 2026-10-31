import { z } from "zod";
import type { RateLimitResult, RateLimitRule } from "@/lib/db/rate-limit";
import type { IgdbGame, IgdbSearchResult } from "./igdb";
import { sanitizeName } from "./recommendations";
import type { RecommendationView } from "./recommendations";
import type { VoteOutcome } from "./recommendation-stats";

export const RECOMMENDATION_RATE_LIMIT: RateLimitRule = {
  routeKey: "game-recommendations",
  maxHits: 5,
  windowInSeconds: 60 * 60,
};

export const VOTE_RATE_LIMIT: RateLimitRule = {
  routeKey: "game-recommendation-votes",
  maxHits: 20,
  windowInSeconds: 60 * 60,
};

const NO_STORE = { "Cache-Control": "no-store" };
const SEARCH_CACHE_HEADERS = { "Cache-Control": "public, s-maxage=3600, max-age=300" };

const browserIdSchema = z.uuid();

const searchQuerySchema = z.string().trim().min(2).max(80);

const submissionSchema = z.object({
  browserId: browserIdSchema,
  igdbId: z.number().int().positive(),
  becauseSlug: z.string().min(1).max(80),
  name: z.string().max(200).optional(),
  /** Honeypot: hidden from people, so only bots fill it. */
  website: z.string().optional(),
});

const voteSchema = z.object({
  browserId: browserIdSchema,
  recommendationId: z.number().int().positive(),
  voted: z.boolean(),
});

type RateLimitDependencies = {
  hashClientIp: (headers: Headers) => string;
  checkRateLimit: (ipHash: string, rule: RateLimitRule) => Promise<RateLimitResult>;
};

function rateLimitedResponse(limit: RateLimitResult): Response {
  return Response.json(
    { error: "rate_limited" },
    { status: 429, headers: { ...NO_STORE, "Retry-After": String(limit.retryAfterInSeconds) } },
  );
}

function invalidBodyResponse(): Response {
  return Response.json({ error: "invalid_body" }, { status: 400, headers: NO_STORE });
}

export type SearchRouteDependencies = {
  searchGames: (text: string) => Promise<IgdbSearchResult[]>;
};

/** Proxies IGDB so its credentials never reach the browser. */
export function createSearchRoute(dependencies: SearchRouteDependencies) {
  return {
    async GET(request: Request): Promise<Response> {
      const query = searchQuerySchema.safeParse(new URL(request.url).searchParams.get("q"));
      if (!query.success) {
        return invalidBodyResponse();
      }
      try {
        const results = await dependencies.searchGames(query.data);
        return Response.json({ results }, { headers: SEARCH_CACHE_HEADERS });
      } catch {
        return Response.json({ error: "search_unavailable" }, { status: 502, headers: NO_STORE });
      }
    },
  };
}

export type RecommendationRouteDependencies = RateLimitDependencies & {
  /** Fetches the game from IGDB by id so the browser never supplies title or cover. */
  getGame: (igdbId: number) => Promise<IgdbGame | undefined>;
  isLikeableGame: (slug: string) => boolean;
  submitRecommendation: (submission: {
    game: IgdbGame;
    browserId: string;
    name: string | null;
    becauseSlug: string;
  }) => Promise<RecommendationView | undefined>;
  readRecommendations: (browserId: string | undefined) => Promise<RecommendationView[]>;
};

export function createRecommendationRoute(dependencies: RecommendationRouteDependencies) {
  return {
    async GET(request: Request): Promise<Response> {
      const rawBrowserId = new URL(request.url).searchParams.get("browserId");
      const browserId = browserIdSchema.safeParse(rawBrowserId);
      const recommendations = await dependencies.readRecommendations(
        browserId.success ? browserId.data : undefined,
      );
      return Response.json({ recommendations }, { headers: NO_STORE });
    },

    async POST(request: Request): Promise<Response> {
      const ipHash = dependencies.hashClientIp(request.headers);
      const limit = await dependencies.checkRateLimit(ipHash, RECOMMENDATION_RATE_LIMIT);
      if (!limit.allowed) {
        return rateLimitedResponse(limit);
      }

      const body = submissionSchema.safeParse(await request.json().catch(() => null));
      if (!body.success || !dependencies.isLikeableGame(body.data.becauseSlug)) {
        return invalidBodyResponse();
      }
      if (body.data.website) {
        return Response.json({ recommendation: null }, { headers: NO_STORE });
      }

      const game = await dependencies.getGame(body.data.igdbId).catch(() => undefined);
      if (!game) {
        return invalidBodyResponse();
      }
      const recommendation = await dependencies.submitRecommendation({
        game,
        browserId: body.data.browserId,
        name: sanitizeName(body.data.name),
        becauseSlug: body.data.becauseSlug,
      });
      return Response.json({ recommendation: recommendation ?? null }, { headers: NO_STORE });
    },
  };
}

export type VoteRouteDependencies = RateLimitDependencies & {
  setRecommendationVote: (
    recommendationId: number,
    browserId: string,
    voted: boolean,
  ) => Promise<VoteOutcome>;
};

export function createVoteRoute(dependencies: VoteRouteDependencies) {
  return {
    async POST(request: Request): Promise<Response> {
      const ipHash = dependencies.hashClientIp(request.headers);
      const limit = await dependencies.checkRateLimit(ipHash, VOTE_RATE_LIMIT);
      if (!limit.allowed) {
        return rateLimitedResponse(limit);
      }

      const body = voteSchema.safeParse(await request.json().catch(() => null));
      if (!body.success) {
        return invalidBodyResponse();
      }
      const { recommendationId, browserId, voted } = body.data;
      const outcome = await dependencies.setRecommendationVote(recommendationId, browserId, voted);
      if (outcome.kind === "not_approved") {
        return Response.json({ error: "not_found" }, { status: 404, headers: NO_STORE });
      }
      return Response.json(
        { recommendationId, voted, count: outcome.count },
        { headers: NO_STORE },
      );
    },
  };
}
