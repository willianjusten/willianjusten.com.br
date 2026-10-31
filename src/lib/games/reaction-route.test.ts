import { describe, expect, it } from "vitest";
import { createReactionRoute, REACTION_RATE_LIMIT } from "./reaction-route";

const BROWSER_ID = "3f1c2d4e-5a6b-4c7d-8e9f-0a1b2c3d4e5f";

function buildRoute(overrides: { allowed?: boolean } = {}) {
  const calls: { gameSlug: string; browserId: string; reacted: boolean }[] = [];
  const route = createReactionRoute({
    hashClientIp: () => "hashed-visitor",
    checkRateLimit: async () => ({ allowed: overrides.allowed ?? true, retryAfterInSeconds: 30 }),
    isKnownGame: (gameSlug) => gameSlug === "alan-wake-2",
    setReaction: async (gameSlug, browserId, reacted) => {
      calls.push({ gameSlug, browserId, reacted });
      return { count: reacted ? 1 : 0 };
    },
    readReactions: async (browserId) => ({
      counts: { "alan-wake-2": 3 },
      mine: browserId ? ["alan-wake-2"] : [],
    }),
  });
  return { route, calls };
}

function postReaction(body: unknown) {
  return new Request("http://localhost/api/games/reactions", {
    method: "POST",
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("reactions route", () => {
  it("stores a reaction and returns the new count", async () => {
    const { route, calls } = buildRoute();
    const response = await route.POST(
      postReaction({ gameSlug: "alan-wake-2", browserId: BROWSER_ID, reacted: true }),
    );
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ gameSlug: "alan-wake-2", reacted: true, count: 1 });
    expect(calls).toEqual([{ gameSlug: "alan-wake-2", browserId: BROWSER_ID, reacted: true }]);
  });

  it("rejects malformed bodies, bad browser ids and unknown games", async () => {
    const { route, calls } = buildRoute();
    const bodies = [
      "not json",
      {},
      { gameSlug: "alan-wake-2", browserId: "nope", reacted: true },
      { gameSlug: "alan-wake-2", browserId: BROWSER_ID, reacted: "yes" },
      { gameSlug: "made-up", browserId: BROWSER_ID, reacted: true },
    ];
    for (const body of bodies) {
      expect((await route.POST(postReaction(body))).status).toBe(400);
    }
    expect(calls).toEqual([]);
  });

  it("answers 429 with Retry-After and stores nothing when rate limited", async () => {
    const { route, calls } = buildRoute({ allowed: false });
    const response = await route.POST(
      postReaction({ gameSlug: "alan-wake-2", browserId: BROWSER_ID, reacted: true }),
    );
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("30");
    expect(calls).toEqual([]);
  });

  it("limits to about 20 reactions an hour", () => {
    expect(REACTION_RATE_LIMIT).toMatchObject({ maxHits: 20, windowInSeconds: 3600 });
  });

  it("returns counts and this browser's reactions on GET", async () => {
    const { route } = buildRoute();
    const response = await route.GET(
      new Request(`http://localhost/api/games/reactions?browserId=${BROWSER_ID}`),
    );
    expect(await response.json()).toEqual({
      counts: { "alan-wake-2": 3 },
      mine: ["alan-wake-2"],
    });
    const anonymous = await route.GET(new Request("http://localhost/api/games/reactions"));
    expect((await anonymous.json()).mine).toEqual([]);
  });
});
