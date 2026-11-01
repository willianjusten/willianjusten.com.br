/**
 * Run by hand: `pnpm games:covers` (add `--refresh` to ignore the cache).
 * Finds the IGDB cover of every curated game with a real title and writes
 * src/content/generated/game-covers.json. Games already in that file are skipped.
 * A game whose title search finds no exact match is reported; pin it with `igdbId` in games.ts.
 */
import { readFile, writeFile } from "node:fs/promises";
import { gameCoversFileSchema, type GameCoverEntry } from "../../src/content/game-cover-schema.ts";
import { games } from "../../src/content/games.ts";
import { createIgdbClient, type IgdbGame } from "../../src/features/games/lib/igdb.ts";
import { pickIgdbMatch } from "./match.ts";

const OUTPUT_PATH = new URL("../../src/content/generated/game-covers.json", import.meta.url);
const PLACEHOLDER_TITLE = /^\[.+\]$/;
/** IGDB allows 4 requests per second; one game every 300ms stays well under it. */
const DELAY_BETWEEN_GAMES_IN_MS = 300;

const clientId = process.env.IGDB_CLIENT_ID;
const clientSecret = process.env.IGDB_CLIENT_SECRET;
if (!clientId || !clientSecret) {
  throw new Error("IGDB_CLIENT_ID and IGDB_CLIENT_SECRET must be set (see README).");
}
const igdb = createIgdbClient({ clientId, clientSecret });

function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function findGame(title: string, igdbId: number | undefined): Promise<IgdbGame | null> {
  if (igdbId !== undefined) return (await igdb.getGame(igdbId)) ?? null;
  return pickIgdbMatch(title, await igdb.searchGames(title));
}

const shouldRefresh = process.argv.includes("--refresh");
const covers: Record<string, GameCoverEntry> = shouldRefresh
  ? {}
  : gameCoversFileSchema.parse(JSON.parse(await readFile(OUTPUT_PATH, "utf8")));

const curatedGames = games.filter((game) => !PLACEHOLDER_TITLE.test(game.title));
const pendingGames = curatedGames.filter((game) => !covers[game.slug]);
const missing: string[] = [];

for (const game of pendingGames) {
  const match = await findGame(game.title, game.igdbId);
  if (match?.coverImageId) {
    covers[game.slug] = {
      igdbId: match.igdbId,
      igdbTitle: match.title,
      coverImageId: match.coverImageId,
      fetchedAt: new Date().toISOString(),
    };
    console.log(`found   ${game.slug}: ${match.title} (${match.igdbId})`);
  } else {
    missing.push(game.slug);
    console.log(`missing ${game.slug}: no exact IGDB match with a cover`);
  }
  await sleep(DELAY_BETWEEN_GAMES_IN_MS);
}

// Drop covers of games that were removed from the content module.
const curatedSlugs = new Set(curatedGames.map((game) => game.slug));
const keptCovers = Object.fromEntries(
  Object.entries(covers).filter(([slug]) => curatedSlugs.has(slug)),
);
await writeFile(OUTPUT_PATH, `${JSON.stringify(keptCovers, null, 2)}\n`);

console.log(
  `\n${Object.keys(keptCovers).length} covers saved, ${pendingGames.length - missing.length} new.`,
);
if (missing.length > 0) console.log(`Pin these with igdbId in games.ts: ${missing.join(", ")}`);
