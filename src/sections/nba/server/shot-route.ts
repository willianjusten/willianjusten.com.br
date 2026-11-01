import { z } from "zod";
import type { RateLimitRule } from "@/lib/db/rate-limit";
import {
  consumeRateLimit,
  invalidBodyResponse,
  NO_STORE,
  parseJsonBody,
  type RateLimitGuardDependencies,
} from "@/lib/api/rate-limit-guard";
import type { ShotTotals } from "./shot-stats";

export const SHOT_RATE_LIMIT: RateLimitRule = {
  routeKey: "nba-shots",
  maxHits: 30,
  windowInSeconds: 60,
};

const shotBodySchema = z.object({ made: z.boolean() });

export type ShotRouteDependencies = RateLimitGuardDependencies & {
  recordShot: (made: boolean) => Promise<ShotTotals>;
  readTotals: () => Promise<ShotTotals>;
};

/** Request logic kept free of Next and Neon so the route file stays a thin wiring layer. */
export function createShotRoute(dependencies: ShotRouteDependencies) {
  return {
    async GET(): Promise<Response> {
      return Response.json(await dependencies.readTotals(), { headers: NO_STORE });
    },

    async POST(request: Request): Promise<Response> {
      const body = await parseJsonBody(request, shotBodySchema);
      if (!body.success) {
        return invalidBodyResponse();
      }

      const rejection = await consumeRateLimit(dependencies, request, SHOT_RATE_LIMIT);
      if (rejection) {
        return rejection;
      }

      return Response.json(await dependencies.recordShot(body.data.made), { headers: NO_STORE });
    },
  };
}
