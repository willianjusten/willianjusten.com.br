import { describe, expect, it } from "vitest";
import {
  createRecommendationRoute,
  createSearchRoute,
  createVoteRoute,
  RECOMMENDATION_RATE_LIMIT,
  VOTE_RATE_LIMIT,
} from "./recommendation-routes";
import { REACTION_RATE_LIMIT } from "./reaction-route";
import type { RecommendationView } from "./recommendations";

const BROWSER_ID = "3f1c2d4e-5a6b-4c7d-8e9f-0a1b2c3d4e5f";

const GAME = {
  igdbId: 185246,
  title: "Alan Wake II",
  year: 2023,
  platforms: ["ps5" as const],
  coverImageId: "co6jar",
};

const VIEW: RecommendationView = {
  id: 7,
  title: "Alan Wake II",
  year: 2023,
  platform: "ps5",
  coverUrl: null,
  status: "pending",
  count: 1,
  mine: true,
  createdAt: "2026-01-01T00:00:00.000Z",
};

function post(body: unknown) {
  return new Request("http://localhost/api", {
    method: "POST",
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function buildRecommendationRoute(options: { allowed?: boolean } = {}) {
  const submissions: { browserId: string; igdbId: number }[] = [];
  const rules: string[] = [];
  const route = createRecommendationRoute({
    hashClientIp: () => "hashed",
    checkRateLimit: async (_ipHash, rule) => {
      rules.push(rule.routeKey);
      return { allowed: options.allowed ?? true, retryAfterInSeconds: 60 };
    },
    getGame: async (igdbId) => (igdbId === GAME.igdbId ? GAME : undefined),
    submitRecommendation: async ({ game, browserId }) => {
      submissions.push({ browserId, igdbId: game.igdbId });
      return VIEW;
    },
    readRecommendations: async (browserId) => (browserId ? [VIEW] : []),
  });
  return { route, submissions, rules };
}

const VALID_SUBMISSION = {
  browserId: BROWSER_ID,
  igdbId: GAME.igdbId,
};

describe("recommendations route", () => {
  it("saves a submission for the game and ignores extra fields", async () => {
    const { route, submissions, rules } = buildRecommendationRoute();
    const response = await route.POST(post({ ...VALID_SUBMISSION, name: "Ana", becauseSlug: "x" }));
    expect(response.status).toBe(200);
    expect((await response.json()).recommendation.id).toBe(7);
    expect(submissions).toEqual([{ browserId: BROWSER_ID, igdbId: GAME.igdbId }]);
    expect(rules).toEqual([RECOMMENDATION_RATE_LIMIT.routeKey]);
  });

  it("drops honeypot submissions without saving anything", async () => {
    const { route, submissions, rules } = buildRecommendationRoute();
    const response = await route.POST(post({ ...VALID_SUBMISSION, website: "http://spam" }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ recommendation: null });
    expect(submissions).toEqual([]);
    expect(rules).toEqual([]);
  });

  it("rejects bad bodies and unknown IGDB games", async () => {
    const { route, submissions, rules } = buildRecommendationRoute();
    const bodies = ["not json", {}, { ...VALID_SUBMISSION, browserId: "nope" }];
    for (const body of bodies) {
      expect((await route.POST(post(body))).status).toBe(400);
    }
    expect(rules).toEqual([]);

    // An unknown IGDB id needs the IGDB lookup, so it is checked after the rate limit.
    expect((await route.POST(post({ ...VALID_SUBMISSION, igdbId: 1 }))).status).toBe(400);
    expect(rules).toEqual([RECOMMENDATION_RATE_LIMIT.routeKey]);
    expect(submissions).toEqual([]);
  });

  it("answers 429 with Retry-After once the limit is hit", async () => {
    const { route, submissions } = buildRecommendationRoute({ allowed: false });
    const response = await route.POST(post(VALID_SUBMISSION));
    expect(response.status).toBe(429);
    expect(response.headers.get("Retry-After")).toBe("60");
    expect(submissions).toEqual([]);
  });

  it("lists recommendations for a valid browser id only", async () => {
    const { route } = buildRecommendationRoute();
    const withBrowser = await route.GET(
      new Request(`http://localhost/api?browserId=${BROWSER_ID}`),
    );
    const withoutBrowser = await route.GET(new Request("http://localhost/api?browserId=x"));
    expect((await withBrowser.json()).recommendations).toHaveLength(1);
    expect((await withoutBrowser.json()).recommendations).toHaveLength(0);
  });
});

describe("votes route", () => {
  function buildVoteRoute(options: { allowed?: boolean; approved?: boolean } = {}) {
    const calls: boolean[] = [];
    const rules: string[] = [];
    const route = createVoteRoute({
      hashClientIp: () => "hashed",
      checkRateLimit: async (_ipHash, rule) => {
        rules.push(rule.routeKey);
        return { allowed: options.allowed ?? true, retryAfterInSeconds: 60 };
      },
      setRecommendationVote: async (_id, _browserId, voted) => {
        calls.push(voted);
        return options.approved === false ? { kind: "not_approved" } : { kind: "ok", count: 4 };
      },
    });
    return { route, calls, rules };
  }

  it("counts a +1 and an undo", async () => {
    const { route, calls, rules } = buildVoteRoute();
    const body = { browserId: BROWSER_ID, recommendationId: 7 };
    const added = await route.POST(post({ ...body, voted: true }));
    await route.POST(post({ ...body, voted: false }));
    expect(await added.json()).toEqual({ recommendationId: 7, voted: true, count: 4 });
    expect(calls).toEqual([true, false]);
    expect(rules).toEqual([VOTE_RATE_LIMIT.routeKey, VOTE_RATE_LIMIT.routeKey]);
  });

  it("refuses votes on games that are not approved", async () => {
    const { route } = buildVoteRoute({ approved: false });
    const response = await route.POST(
      post({ browserId: BROWSER_ID, recommendationId: 7, voted: true }),
    );
    expect(response.status).toBe(404);
  });

  it("rate limits and validates", async () => {
    const limited = buildVoteRoute({ allowed: false });
    expect(
      (await limited.route.POST(post({ browserId: BROWSER_ID, recommendationId: 7, voted: true })))
        .status,
    ).toBe(429);
    const open = buildVoteRoute();
    expect((await open.route.POST(post({ browserId: BROWSER_ID, voted: true }))).status).toBe(400);
    expect(open.calls).toEqual([]);
    expect(open.rules).toEqual([]);
  });

  it("shares one hourly budget with game reactions", () => {
    expect(VOTE_RATE_LIMIT).toEqual(REACTION_RATE_LIMIT);
  });
});

describe("search route", () => {
  const route = createSearchRoute({
    searchGames: async (text) => (text === "boom" ? Promise.reject(new Error("down")) : []),
  });

  it("rejects short queries and reports upstream failures", async () => {
    expect((await route.GET(new Request("http://localhost/api?q=a"))).status).toBe(400);
    expect((await route.GET(new Request("http://localhost/api"))).status).toBe(400);
    expect((await route.GET(new Request("http://localhost/api?q=boom"))).status).toBe(502);
  });

  it("returns cacheable results", async () => {
    const response = await route.GET(new Request("http://localhost/api?q=alan"));
    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toContain("s-maxage");
    expect(await response.json()).toEqual({ results: [] });
  });
});
