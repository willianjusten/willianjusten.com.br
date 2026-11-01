import type { z } from "zod";
import type { RateLimitResult, RateLimitRule } from "@/lib/db/rate-limit";

export const NO_STORE = { "Cache-Control": "no-store" };

export type RateLimitGuardDependencies = {
  hashClientIp: (headers: Headers) => string;
  checkRateLimit: (ipHash: string, rule: RateLimitRule) => Promise<RateLimitResult>;
};

export function invalidBodyResponse(): Response {
  return Response.json({ error: "invalid_body" }, { status: 400, headers: NO_STORE });
}

/** Parses the JSON body against `schema`; a missing or malformed body fails the parse like bad fields do. */
export async function parseJsonBody<Schema extends z.ZodType>(
  request: Request,
  schema: Schema,
): Promise<z.ZodSafeParseResult<z.output<Schema>>> {
  return schema.safeParse(await request.json().catch(() => null));
}

function rateLimitedResponse(limit: RateLimitResult): Response {
  return Response.json(
    { error: "rate_limited" },
    { status: 429, headers: { ...NO_STORE, "Retry-After": String(limit.retryAfterInSeconds) } },
  );
}

/**
 * Counts one hit for the caller against `rule`. Returns the 429 response to send when the limit
 * is hit, or undefined to carry on. Routes call it after validating the body, so requests that
 * will be rejected anyway do not use up the visitor's quota.
 */
export async function consumeRateLimit(
  dependencies: RateLimitGuardDependencies,
  request: Request,
  rule: RateLimitRule,
): Promise<Response | undefined> {
  const limit = await dependencies.checkRateLimit(dependencies.hashClientIp(request.headers), rule);
  return limit.allowed ? undefined : rateLimitedResponse(limit);
}
