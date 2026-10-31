import { z } from "zod";
import type { RateLimitResult, RateLimitRule } from "@/lib/db/rate-limit";
import type { ShotTotals } from "./shot-stats";

export const SHOT_RATE_LIMIT: RateLimitRule = {
  routeKey: "nba-shots",
  maxHits: 30,
  windowInSeconds: 60,
};

const shotBodySchema = z.object({ made: z.boolean() });

export type ShotRouteDependencies = {
  hashClientIp: (headers: Headers) => string;
  checkRateLimit: (ipHash: string, rule: RateLimitRule) => Promise<RateLimitResult>;
  recordShot: (made: boolean) => Promise<ShotTotals>;
  readTotals: () => Promise<ShotTotals>;
};

const NO_STORE = { "Cache-Control": "no-store" };

/** Request logic kept free of Next and Neon so the route file stays a thin wiring layer. */
export function createShotRoute(dependencies: ShotRouteDependencies) {
  return {
    async GET(): Promise<Response> {
      return Response.json(await dependencies.readTotals(), { headers: NO_STORE });
    },

    async POST(request: Request): Promise<Response> {
      const ipHash = dependencies.hashClientIp(request.headers);
      const limit = await dependencies.checkRateLimit(ipHash, SHOT_RATE_LIMIT);
      if (!limit.allowed) {
        return Response.json(
          { error: "rate_limited" },
          {
            status: 429,
            headers: { ...NO_STORE, "Retry-After": String(limit.retryAfterInSeconds) },
          },
        );
      }

      const body = shotBodySchema.safeParse(await request.json().catch(() => null));
      if (!body.success) {
        return Response.json({ error: "invalid_body" }, { status: 400, headers: NO_STORE });
      }

      return Response.json(await dependencies.recordShot(body.data.made), { headers: NO_STORE });
    },
  };
}
