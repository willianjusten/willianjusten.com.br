import { describe, expect, it } from "vitest";
import { createIgdbClient, pickPrimaryPlatform, translateIgdbGame } from "../lib/igdb";

const ALAN_WAKE_2 = {
  id: 185246,
  name: "Alan Wake II",
  first_release_date: 1698364800,
  platforms: [169, 6, 167],
  cover: { id: 1, image_id: "co6jar" },
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status });
}

/** Fake Twitch + IGDB. `rejectedTokens` are answered with a 401 from IGDB. */
function buildFakeNetwork(
  rejectedTokens: string[] = [],
  games: unknown[] | ((query: string) => unknown[]) = [ALAN_WAKE_2],
) {
  const requests: { url: string; token?: string; body?: string }[] = [];
  let tokensIssued = 0;
  const fetchImplementation: typeof fetch = async (input, init) => {
    const url = String(input);
    const headers = new Headers(init?.headers);
    requests.push({
      url,
      token: headers.get("Authorization")?.replace("Bearer ", ""),
      body: init?.body as string | undefined,
    });
    if (url.startsWith("https://id.twitch.tv/oauth2/token")) {
      tokensIssued += 1;
      return jsonResponse({ access_token: `token-${tokensIssued}`, expires_in: 3600 });
    }
    const token = headers.get("Authorization")?.replace("Bearer ", "") ?? "";
    if (rejectedTokens.includes(token)) {
      return jsonResponse({}, 401);
    }
    return jsonResponse(typeof games === "function" ? games(String(init?.body)) : games);
  };
  return { fetchImplementation, requests };
}

describe("translateIgdbGame", () => {
  it("maps platforms in priority order and reads the release year in UTC", () => {
    expect(translateIgdbGame(ALAN_WAKE_2)).toEqual({
      igdbId: 185246,
      title: "Alan Wake II",
      year: 2023,
      platforms: ["ps5", "xbox", "rog"],
      coverImageId: "co6jar",
    });
  });

  it("keeps games that are on none of the shelf platforms, with no platforms listed", () => {
    expect(translateIgdbGame({ id: 1, name: "Old", platforms: [12] })).toMatchObject({
      igdbId: 1,
      title: "Old",
      platforms: [],
    });
  });

  it("falls back to a generic platform for the case when no shelf platform matches", () => {
    expect(pickPrimaryPlatform([])).toBe("rog");
    expect(pickPrimaryPlatform(["xbox", "rog"])).toBe("xbox");
  });

  it("allows a missing year and cover", () => {
    expect(translateIgdbGame({ id: 2, name: "New", platforms: [508] })).toMatchObject({
      year: null,
      coverImageId: null,
      platforms: ["switch2"],
    });
  });
});

describe("IGDB client", () => {
  it("returns portrait covers and reuses the cached token and results", async () => {
    const { fetchImplementation, requests } = buildFakeNetwork();
    const client = createIgdbClient({
      clientId: "id",
      clientSecret: "secret",
      fetchImplementation,
    });

    const first = await client.searchGames("Alan Wake");
    await client.searchGames("alan wake");
    await client.searchGames("something else");

    expect(first[0].coverUrl).toBe(
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co6jar.jpg",
    );
    expect(requests.filter((request) => request.url.includes("oauth2"))).toHaveLength(1);
    // Two cached-miss searches, each a whole-word query plus a partial-word query.
    expect(requests.filter((request) => request.url.includes("api.igdb.com"))).toHaveLength(4);
  });

  it("refreshes the token once when IGDB answers 401", async () => {
    const { fetchImplementation, requests } = buildFakeNetwork(["token-1"]);
    const client = createIgdbClient({
      clientId: "id",
      clientSecret: "secret",
      fetchImplementation,
    });

    const results = await client.searchGames("alan wake");

    expect(results).toHaveLength(1);
    const tokenRequests = requests.filter((request) => request.url.includes("oauth2"));
    const retriedTokens = requests
      .filter((request) => request.url.includes("api.igdb.com"))
      .map((request) => request.token);
    expect(tokenRequests).toHaveLength(2);
    expect(retriedTokens).toEqual(["token-1", "token-1", "token-2", "token-2"]);
  });

  it("requests a new token after the old one expires", async () => {
    const { fetchImplementation, requests } = buildFakeNetwork();
    let currentTime = 0;
    const client = createIgdbClient({
      clientId: "id",
      clientSecret: "secret",
      fetchImplementation,
      now: () => currentTime,
    });

    await client.getGame(1);
    currentTime = 3600 * 1000;
    await client.getGame(1);

    expect(requests.filter((request) => request.url.includes("oauth2"))).toHaveLength(2);
  });

  it("strips quotes from the search text so it cannot break out of the query", async () => {
    const { fetchImplementation, requests } = buildFakeNetwork();
    const client = createIgdbClient({
      clientId: "id",
      clientSecret: "secret",
      fetchImplementation,
    });

    await client.searchGames('a"; fields *; "b');

    const query = requests.find((request) => request.url.includes("api.igdb.com"))?.body ?? "";
    expect(query.startsWith('search "a ; fields *; b";')).toBe(true);
  });

  it("does not filter by platform so any game can be recommended, but skips editions", async () => {
    const { fetchImplementation, requests } = buildFakeNetwork();
    const client = createIgdbClient({
      clientId: "id",
      clientSecret: "secret",
      fetchImplementation,
    });

    await client.searchGames("zelda");

    const query = requests.find((request) => request.url.includes("api.igdb.com"))?.body ?? "";
    expect(query).not.toContain("platforms =");
    expect(query).toContain("version_parent = null");
  });
});

describe("IGDB search ranking", () => {
  /** Shaped like IGDB's real answer for "journey": its own order buries the classic. */
  const journeyMatches = [
    { id: 1, name: "The Sims 4: Journey to Batuu", game_type: 1, total_rating_count: 8 },
    { id: 2, name: "Journey to the West: A Super Mario Bros. ROM Hack", game_type: 5 },
    { id: 3, name: "AFK Journey", game_type: 0, total_rating_count: 19 },
    { id: 4, name: "The Longest Journey", game_type: 0, total_rating_count: 203 },
    { id: 5, name: "Journey", game_type: 0 },
    { id: 6, name: "Journey", game_type: 0, total_rating_count: 1202 },
    { id: 7, name: "Journey's Land", game_type: 0 },
    { id: 8, name: "The Sims 4: Plus Journey to Batuu Bundle", game_type: 3 },
    {
      id: 9,
      name: "Shin Megami Tensei: Strange Journey Redux",
      game_type: 8,
      total_rating_count: 17,
    },
  ];

  async function searchJourney(text = "journey") {
    const { fetchImplementation, requests } = buildFakeNetwork([], journeyMatches);
    const client = createIgdbClient({
      clientId: "id",
      clientSecret: "secret",
      fetchImplementation,
    });
    const results = await client.searchGames(text);
    const query = requests.find((request) => request.url.includes("api.igdb.com"))?.body ?? "";
    return { titles: results.map((result) => `${result.igdbId} ${result.title}`), query };
  }

  it("puts exact title matches first, most rated first, then the rest by popularity", async () => {
    const { titles } = await searchJourney();
    expect(titles).toEqual([
      "6 Journey",
      "5 Journey",
      "4 The Longest Journey",
      "3 AFK Journey",
      "9 Shin Megami Tensei: Strange Journey Redux",
      "7 Journey's Land",
    ]);
  });

  it("matches the exact title regardless of case, spacing and punctuation", async () => {
    const { titles } = await searchJourney("  JOURNEY! ");
    expect(titles[0]).toBe("6 Journey");
  });

  it("drops mods, DLC and bundles", async () => {
    const { titles } = await searchJourney();
    expect(titles.join()).not.toMatch(/Batuu|ROM Hack/);
  });

  it("asks IGDB for a wide pool to rank and returns at most ten", async () => {
    const manyMatches = Array.from({ length: 30 }, (_, index) => ({
      id: index,
      name: `Journey ${index}`,
      game_type: 0,
    }));
    const { fetchImplementation, requests } = buildFakeNetwork([], manyMatches);
    const client = createIgdbClient({
      clientId: "id",
      clientSecret: "secret",
      fetchImplementation,
    });

    const results = await client.searchGames("journey");

    const query = requests.find((request) => request.url.includes("api.igdb.com"))?.body ?? "";
    expect(query).toContain("limit 50;");
    expect(query).toContain("game_type");
    expect(query).toContain("total_rating_count");
    expect(results).toHaveLength(10);
  });
});

describe("IGDB search while typing", () => {
  const BREATH_OF_THE_WILD = {
    id: 7346,
    name: "The Legend of Zelda: Breath of the Wild",
    game_type: 0,
    total_rating_count: 3027,
  };

  async function searchFor(text: string, answer: (query: string) => unknown[]) {
    const { fetchImplementation, requests } = buildFakeNetwork([], answer);
    const client = createIgdbClient({
      clientId: "id",
      clientSecret: "secret",
      fetchImplementation,
    });
    const results = await client.searchGames(text);
    const queries = requests
      .filter((request) => request.url.includes("api.igdb.com"))
      .map((request) => request.body ?? "");
    return { titles: results.map((result) => result.title), queries };
  }

  it("finds a game while its last word is still half typed", async () => {
    // IGDB's search only matches whole words, so "bre" alone matches nothing.
    const { titles, queries } = await searchFor("zelda bre", (query) =>
      query.includes('name ~ *"bre"*') ? [BREATH_OF_THE_WILD] : [],
    );

    expect(titles).toEqual(["The Legend of Zelda: Breath of the Wild"]);
    expect(queries).toContainEqual(expect.stringMatching(/^search "zelda";.*name ~ \*"bre"\*/));
  });

  it("finds the most rated games containing a single half-typed word", async () => {
    const { titles, queries } = await searchFor("zel", (query) =>
      query.includes('name ~ *"zel"*') ? [BREATH_OF_THE_WILD] : [],
    );

    expect(titles).toEqual(["The Legend of Zelda: Breath of the Wild"]);
    expect(queries).toContainEqual(expect.stringContaining("sort total_rating_count desc;"));
  });

  it("lists a game found by both queries only once", async () => {
    const { titles } = await searchFor("zelda breath", () => [BREATH_OF_THE_WILD]);
    expect(titles).toEqual(["The Legend of Zelda: Breath of the Wild"]);
  });
});
