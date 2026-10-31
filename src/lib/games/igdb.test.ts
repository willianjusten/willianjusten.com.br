import { describe, expect, it } from "vitest";
import { createIgdbClient, translateIgdbGame } from "./igdb";

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
function buildFakeNetwork(rejectedTokens: string[] = []) {
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
    return jsonResponse([ALAN_WAKE_2]);
  };
  return { fetchImplementation, requests };
}

describe("translateIgdbGame", () => {
  it("maps platforms in priority order and reads the release year in UTC", () => {
    expect(translateIgdbGame(ALAN_WAKE_2)).toEqual({
      igdbId: 185246,
      title: "Alan Wake II",
      year: 2023,
      platforms: ["ps5", "xbox", "pc"],
      coverImageId: "co6jar",
    });
  });

  it("drops games that are on none of the shelf platforms", () => {
    expect(translateIgdbGame({ id: 1, name: "Old", platforms: [12] })).toBeUndefined();
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
    const client = createIgdbClient({ clientId: "id", clientSecret: "secret", fetchImplementation });

    const first = await client.searchGames("Alan Wake");
    await client.searchGames("alan wake");
    await client.searchGames("something else");

    expect(first[0].coverUrl).toBe(
      "https://images.igdb.com/igdb/image/upload/t_cover_big/co6jar.jpg",
    );
    expect(requests.filter((request) => request.url.includes("oauth2"))).toHaveLength(1);
    expect(requests.filter((request) => request.url.includes("api.igdb.com"))).toHaveLength(2);
  });

  it("refreshes the token once when IGDB answers 401", async () => {
    const { fetchImplementation, requests } = buildFakeNetwork(["token-1"]);
    const client = createIgdbClient({ clientId: "id", clientSecret: "secret", fetchImplementation });

    const results = await client.searchGames("alan wake");

    expect(results).toHaveLength(1);
    expect(requests.map((request) => request.token)).toEqual([undefined, "token-1", undefined, "token-2"]);
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
    const client = createIgdbClient({ clientId: "id", clientSecret: "secret", fetchImplementation });

    await client.searchGames('a"; fields *; "b');

    const query = requests.find((request) => request.url.includes("api.igdb.com"))?.body ?? "";
    expect(query.startsWith('search "a ; fields *;  b";')).toBe(true);
  });
});
