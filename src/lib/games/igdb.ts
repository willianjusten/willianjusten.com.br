import type { GamePlatform } from "@/content/games";

const TOKEN_URL = "https://id.twitch.tv/oauth2/token";
const GAMES_URL = "https://api.igdb.com/v4/games";
const COVER_URL_BASE = "https://images.igdb.com/igdb/image/upload/t_cover_big";

/** IGDB platform ids for the consoles on the shelf. The ROG Ally X is a PC, so it maps to `pc`. */
const PLATFORM_BY_IGDB_ID: Record<number, GamePlatform> = {
  167: "ps5",
  169: "xbox",
  508: "switch2",
  6: "pc",
};
const SHELF_IGDB_PLATFORM_IDS = Object.keys(PLATFORM_BY_IGDB_ID).join(",");

/** Order used to pick the platform shown on a recommended case. */
const PLATFORM_PRIORITY: GamePlatform[] = ["ps5", "xbox", "switch2", "rog", "pc"];

const SEARCH_RESULT_LIMIT = 6;
const SEARCH_CACHE_TTL_IN_MILLISECONDS = 60 * 60 * 1000;
const SEARCH_CACHE_MAX_ENTRIES = 200;
/** Refresh slightly early so a token never expires mid-request. */
const TOKEN_EXPIRY_MARGIN_IN_MILLISECONDS = 60 * 1000;

/** A game as the rest of the app sees it, translated from the IGDB payload at this boundary. */
export type IgdbGame = {
  igdbId: number;
  title: string;
  year: number | null;
  /** Shelf platforms the game is on, in platform priority order. Never empty. */
  platforms: GamePlatform[];
  coverImageId: string | null;
};

export type IgdbSearchResult = IgdbGame & { coverUrl: string | null };

type RawIgdbGame = {
  id: number;
  name: string;
  first_release_date?: number;
  platforms?: number[];
  cover?: { image_id?: string };
};

export function buildCoverUrl(coverImageId: string): string {
  return `${COVER_URL_BASE}/${coverImageId}.jpg`;
}

export function pickPrimaryPlatform(platforms: readonly GamePlatform[]): GamePlatform | undefined {
  return PLATFORM_PRIORITY.find((platform) => platforms.includes(platform));
}

/** Returns undefined for games that are on none of the shelf platforms. */
export function translateIgdbGame(raw: RawIgdbGame): IgdbGame | undefined {
  const mapped = new Set(
    (raw.platforms ?? []).flatMap((id) => PLATFORM_BY_IGDB_ID[id] ?? []),
  );
  const platforms = PLATFORM_PRIORITY.filter((platform) => mapped.has(platform));
  if (platforms.length === 0) {
    return undefined;
  }
  return {
    igdbId: raw.id,
    title: raw.name,
    year:
      raw.first_release_date === undefined
        ? null
        : new Date(raw.first_release_date * 1000).getUTCFullYear(),
    platforms,
    coverImageId: raw.cover?.image_id ?? null,
  };
}

export type IgdbClientOptions = {
  clientId: string;
  clientSecret: string;
  fetchImplementation?: typeof fetch;
  now?: () => number;
};

type CachedToken = { accessToken: string; expiresAt: number };

export class IgdbRequestError extends Error {}

/**
 * Talks to IGDB with a Twitch app token that is cached until it expires and renewed once on a 401.
 * Only ever used on the server.
 */
export function createIgdbClient({
  clientId,
  clientSecret,
  fetchImplementation = fetch,
  now = Date.now,
}: IgdbClientOptions) {
  let cachedToken: CachedToken | undefined;
  const searchCache = new Map<string, { expiresAt: number; results: IgdbSearchResult[] }>();

  async function requestToken(): Promise<string> {
    const url = `${TOKEN_URL}?${new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
    })}`;
    const response = await fetchImplementation(url, { method: "POST" });
    if (!response.ok) {
      throw new IgdbRequestError(`Twitch token request failed with ${response.status}`);
    }
    const body: { access_token: string; expires_in: number } = await response.json();
    cachedToken = {
      accessToken: body.access_token,
      expiresAt: now() + body.expires_in * 1000 - TOKEN_EXPIRY_MARGIN_IN_MILLISECONDS,
    };
    return cachedToken.accessToken;
  }

  async function getToken(): Promise<string> {
    if (cachedToken && cachedToken.expiresAt > now()) {
      return cachedToken.accessToken;
    }
    return requestToken();
  }

  async function queryGames(query: string): Promise<RawIgdbGame[]> {
    async function send(accessToken: string) {
      return fetchImplementation(GAMES_URL, {
        method: "POST",
        headers: {
          "Client-ID": clientId,
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
        body: query,
      });
    }

    let response = await send(await getToken());
    if (response.status === 401) {
      response = await send(await requestToken());
    }
    if (!response.ok) {
      throw new IgdbRequestError(`IGDB request failed with ${response.status}`);
    }
    return response.json();
  }

  function withCover(game: IgdbGame): IgdbSearchResult {
    return {
      ...game,
      coverUrl: game.coverImageId ? buildCoverUrl(game.coverImageId) : null,
    };
  }

  return {
    /** Games on the shelf platforms matching the text, base games only. */
    async searchGames(text: string): Promise<IgdbSearchResult[]> {
      const cacheKey = text.trim().toLowerCase();
      const cached = searchCache.get(cacheKey);
      if (cached && cached.expiresAt > now()) {
        return cached.results;
      }
      const escapedText = cacheKey.replaceAll("\\", " ").replaceAll('"', " ");
      const rawGames = await queryGames(
        `search "${escapedText}"; fields name,first_release_date,platforms,cover.image_id; where platforms = (${SHELF_IGDB_PLATFORM_IDS}) & version_parent = null; limit ${SEARCH_RESULT_LIMIT};`,
      );
      const results = rawGames.flatMap((raw) => translateIgdbGame(raw) ?? []).map(withCover);
      if (searchCache.size >= SEARCH_CACHE_MAX_ENTRIES) {
        searchCache.clear();
      }
      searchCache.set(cacheKey, { expiresAt: now() + SEARCH_CACHE_TTL_IN_MILLISECONDS, results });
      return results;
    },

    /** One game by id, so a submission never trusts the title or cover the browser sends. */
    async getGame(igdbId: number): Promise<IgdbGame | undefined> {
      const [raw] = await queryGames(
        `fields name,first_release_date,platforms,cover.image_id; where id = ${Math.trunc(igdbId)}; limit 1;`,
      );
      return raw ? translateIgdbGame(raw) : undefined;
    },
  };
}

export type IgdbClient = ReturnType<typeof createIgdbClient>;
