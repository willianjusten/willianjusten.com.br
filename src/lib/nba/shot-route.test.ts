import { describe, expect, it } from "vitest";
import { createShotRoute, SHOT_RATE_LIMIT } from "./shot-route";

function buildRoute(overrides: { allowed?: boolean } = {}) {
  const recorded: boolean[] = [];
  const hashedWith: Headers[] = [];
  const rateLimitChecks: string[] = [];
  const route = createShotRoute({
    hashClientIp: (headers) => {
      hashedWith.push(headers);
      return "hashed-visitor";
    },
    checkRateLimit: async (_ipHash, rule) => {
      rateLimitChecks.push(rule.routeKey);
      return {
        allowed: overrides.allowed ?? true,
        retryAfterInSeconds: 12,
      };
    },
    recordShot: async (made) => {
      recorded.push(made);
      return { shots: recorded.length, makes: recorded.filter(Boolean).length };
    },
    readTotals: async () => ({ shots: 5, makes: 2 }),
  });
  return { route, recorded, rateLimitChecks };
}

function postShot(body: unknown) {
  return new Request("http://localhost/api/nba/shots", {
    method: "POST",
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("shots route", () => {
  it("records one shot per request and returns the new totals", async () => {
    const { route, recorded } = buildRoute();
    const response = await route.POST(postShot({ made: true }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ shots: 1, makes: 1 });
    expect(recorded).toEqual([true]);
  });

  it("rejects bodies that are not { made: boolean }", async () => {
    const { route, recorded, rateLimitChecks } = buildRoute();
    for (const body of [{ made: "yes" }, {}, "not json", true]) {
      const response = await route.POST(postShot(body));
      expect(response.status).toBe(400);
    }
    expect(recorded).toEqual([]);
    expect(rateLimitChecks).toEqual([]);
  });

  it("answers 429 with Retry-After and records nothing when rate limited", async () => {
    const { route, recorded } = buildRoute({ allowed: false });
    const response = await route.POST(postShot({ made: false }));
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("12");
    expect(recorded).toEqual([]);
  });

  it("limits to about 30 shots a minute", () => {
    expect(SHOT_RATE_LIMIT).toMatchObject({ maxHits: 30, windowInSeconds: 60 });
  });

  it("reads the totals", async () => {
    const { route } = buildRoute();
    expect(await (await route.GET()).json()).toEqual({ shots: 5, makes: 2 });
  });
});
