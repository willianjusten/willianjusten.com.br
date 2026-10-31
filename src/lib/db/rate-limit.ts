import { sql } from "drizzle-orm";
import type { Database } from "./client";
import { rateLimits } from "./schema";

export type RateLimitRule = {
  /** Identifies the route, so limits are counted separately per route. */
  routeKey: string;
  maxHits: number;
  windowInSeconds: number;
};

export type RateLimitResult = {
  allowed: boolean;
  retryAfterInSeconds: number;
};

/** Start of the fixed window that contains `now`. */
export function getWindowStart(now: Date, windowInSeconds: number): Date {
  const windowInMilliseconds = windowInSeconds * 1000;
  return new Date(Math.floor(now.getTime() / windowInMilliseconds) * windowInMilliseconds);
}

/** Decide from the hit count after this request. Pure, so it is testable without a database. */
export function evaluateRateLimit(
  hitsIncludingThisRequest: number,
  rule: RateLimitRule,
  now: Date,
): RateLimitResult {
  const windowStart = getWindowStart(now, rule.windowInSeconds);
  const windowEnd = windowStart.getTime() + rule.windowInSeconds * 1000;
  return {
    allowed: hitsIncludingThisRequest <= rule.maxHits,
    retryAfterInSeconds: Math.max(1, Math.ceil((windowEnd - now.getTime()) / 1000)),
  };
}

/** Counts one hit for this visitor in the current window (atomic upsert) and decides. */
export async function checkRateLimit(
  database: Database,
  ipHash: string,
  rule: RateLimitRule,
  now = new Date(),
): Promise<RateLimitResult> {
  const windowStart = getWindowStart(now, rule.windowInSeconds);
  const [row] = await database
    .insert(rateLimits)
    .values({ routeKey: rule.routeKey, ipHash, windowStart, hits: 1 })
    .onConflictDoUpdate({
      target: [rateLimits.routeKey, rateLimits.ipHash, rateLimits.windowStart],
      set: { hits: sql`${rateLimits.hits} + 1` },
    })
    .returning({ hits: rateLimits.hits });
  return evaluateRateLimit(row.hits, rule, now);
}
