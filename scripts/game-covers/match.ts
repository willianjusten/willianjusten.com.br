import type { IgdbGame } from "../../src/sections/games/lib/igdb.ts";

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, " ")
    .trim();
}

/**
 * The search result that is the same game as the curated title, with a cover.
 * Only exact name matches count, so a sequel or remaster never lends its cover by mistake.
 */
export function pickIgdbMatch(title: string, results: readonly IgdbGame[]): IgdbGame | null {
  const wanted = normalizeTitle(title);
  return (
    results.find((result) => result.coverImageId && normalizeTitle(result.title) === wanted) ?? null
  );
}
