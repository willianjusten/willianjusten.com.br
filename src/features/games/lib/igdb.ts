import type { GamePlatform } from "@/content/games";

const TOKEN_URL = "https://id.twitch.tv/oauth2/token";
const GAMES_URL = "https://api.igdb.com/v4/games";
const COVER_URL_BASE = "https://images.igdb.com/igdb/image/upload";

/**
 * IGDB cover sizes: `thumbnail` is 264px wide, enough for small previews; `case` is the 528px
 * retina version, since a 200px game case needs about 400 device pixels on a 2x screen.
 */
const COVER_SIZES = { thumbnail: "t_cover_big", case: "t_cover_big_2x" } as const;
type CoverSize = keyof typeof COVER_SIZES;

/** IGDB platform ids for the consoles on the shelf. The ROG Ally X is Will's PC, so PC maps to it. */
const PLATFORM_BY_IGDB_ID: Record<number, GamePlatform> = {
  167: "ps5",
  169: "xbox",
  508: "switch2",
  6: "rog",
};

const PLATFORM_PRIORITY: GamePlatform[] = ["ps5", "xbox", "switch2", "rog"];

const SEARCH_RESULT_LIMIT = 10;
/**
 * IGDB's own search order buries well-known games (Journey ranks 18th for "journey"), so a wide
 * pool is fetched and re-ranked here.
 */
const SEARCH_CANDIDATE_LIMIT = 50;
/** IGDB game types that are not a game someone would recommend on their own. */
const UNRECOMMENDABLE_GAME_TYPES = new Set([
  1, // DLC
  3, // Bundle
  5, // Mod, which includes ROM hacks
  6, // Episode
  7, // Season
  13, // Pack / Addon
  14, // Update
]);
const SEARCH_CACHE_TTL_IN_MILLISECONDS = 60 * 60 * 1000;
const SEARCH_CACHE_MAX_ENTRIES = 200;
/** Refresh slightly early so a token never expires mid-request. */
const TOKEN_EXPIRY_MARGIN_IN_MILLISECONDS = 60 * 1000;

export type IgdbGame = {
  igdbId: number;
  title: string;
  year: number | null;
  /** Shelf platforms the game is on, in priority order. Informational, and empty for other consoles. */
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
  game_type?: number;
  total_rating_count?: number;
};

/** Lowercase letters and digits only, so "JOURNEY!" and "Journey" compare equal. */
function normalizeTitle(title: string): string {
  return title.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
}

const SEARCH_FIELDS =
  "fields name,first_release_date,platforms,cover.image_id,game_type,total_rating_count;";

/**
 * IGDB's `search` only matches whole words, so "zelda bre" finds nothing while the visitor is
 * still typing. Alongside the whole-word search, a second query treats the last word as
 * unfinished: it searches the finished words and keeps names containing the last one, or, for a
 * single word, takes the most rated names containing it. Quotes are already stripped from `text`.
 */
function buildSearchQueries(text: string): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lastWord = words.at(-1) ?? "";
  const finishedWords = words.slice(0, -1).join(" ");
  const limit = `limit ${SEARCH_CANDIDATE_LIMIT};`;
  const wholeWordQuery = `search "${words.join(" ")}"; ${SEARCH_FIELDS} where version_parent = null; ${limit}`;
  const partialWordQuery = finishedWords
    ? `search "${finishedWords}"; ${SEARCH_FIELDS} where version_parent = null & name ~ *"${lastWord}"*; ${limit}`
    : `${SEARCH_FIELDS} where version_parent = null & name ~ *"${lastWord}"*; sort total_rating_count desc; ${limit}`;
  return [wholeWordQuery, partialWordQuery];
}

/**
 * Drops add-ons and mods, then puts exact title matches first and sorts each group by how many
 * ratings the game has. Ties keep IGDB's order.
 */
function rankSearchMatches(rawGames: RawIgdbGame[], text: string): RawIgdbGame[] {
  const normalizedText = normalizeTitle(text);
  const isExactMatch = (game: RawIgdbGame) => normalizeTitle(game.name) === normalizedText;
  const uniqueGames = [...new Map(rawGames.map((game) => [game.id, game])).values()];
  return uniqueGames
    .filter((game) => !UNRECOMMENDABLE_GAME_TYPES.has(game.game_type ?? 0))
    .toSorted(
      (first, second) =>
        Number(isExactMatch(second)) - Number(isExactMatch(first)) ||
        (second.total_rating_count ?? 0) - (first.total_rating_count ?? 0),
    )
    .slice(0, SEARCH_RESULT_LIMIT);
}

export function buildCoverUrl(coverImageId: string, size: CoverSize = "thumbnail"): string {
  return `${COVER_URL_BASE}/${COVER_SIZES[size]}/${coverImageId}.jpg`;
}

/** Games on none of the shelf platforms get a ROG Ally X case, the closest thing to a PC. */
const FALLBACK_PLATFORM: GamePlatform = "rog";

export function pickPrimaryPlatform(platforms: readonly GamePlatform[]): GamePlatform {
  return PLATFORM_PRIORITY.find((platform) => platforms.includes(platform)) ?? FALLBACK_PLATFORM;
}

export function translateIgdbGame(raw: RawIgdbGame): IgdbGame {
  const mapped = new Set((raw.platforms ?? []).flatMap((id) => PLATFORM_BY_IGDB_ID[id] ?? []));
  const platforms = PLATFORM_PRIORITY.filter((platform) => mapped.has(platform));
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

type IgdbClientOptions = {
  clientId: string;
  clientSecret: string;
  fetchImplementation?: typeof fetch;
  now?: () => number;
};

type CachedToken = { accessToken: string; expiresAt: number };

class IgdbRequestError extends Error {}

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

  /** Searches send two queries at once, so concurrent callers share one token request. */
  let pendingToken: Promise<string> | undefined;

  async function getToken(): Promise<string> {
    if (cachedToken && cachedToken.expiresAt > now()) {
      return cachedToken.accessToken;
    }
    pendingToken ??= requestToken().finally(() => {
      pendingToken = undefined;
    });
    return pendingToken;
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

    const accessToken = await getToken();
    let response = await send(accessToken);
    if (response.status === 401) {
      // Only drop the token if a parallel query has not already replaced it.
      if (cachedToken?.accessToken === accessToken) cachedToken = undefined;
      response = await send(await getToken());
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
    /** Any game matching the text, base games only (no editions or versions). */
    async searchGames(text: string): Promise<IgdbSearchResult[]> {
      const cacheKey = text.trim().toLowerCase();
      const cached = searchCache.get(cacheKey);
      if (cached && cached.expiresAt > now()) {
        return cached.results;
      }
      const escapedText = cacheKey.replaceAll("\\", " ").replaceAll('"', " ");
      const matchGroups = await Promise.all(buildSearchQueries(escapedText).map(queryGames));
      const results = rankSearchMatches(matchGroups.flat(), cacheKey)
        .map(translateIgdbGame)
        .map(withCover);
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
