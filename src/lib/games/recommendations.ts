import type { GamePlatform } from "@/content/games";

export const MAX_NAME_LENGTH = 30;
const MAX_SHOWN_NAMES = 2;

/** A recommendation as the browser sees it. Pending ones are only ever sent to their submitter. */
export type RecommendationView = {
  id: number;
  title: string;
  year: number | null;
  platform: GamePlatform;
  coverUrl: string | null;
  status: "pending" | "approved";
  count: number;
  /** Most recent named recommenders, at most two. */
  names: string[];
  /** Slug of the game the latest recommender said this one is like. */
  becauseSlug: string | null;
  /** True when this browser has recommended it. */
  mine: boolean;
  createdAt: string;
};

/** Most recommended first; ties go to the newest so a fresh submission lands first among equals. */
export function sortRecommendations<T extends Pick<RecommendationView, "count" | "createdAt">>(
  recommendations: readonly T[],
): T[] {
  return [...recommendations].sort(
    (first, second) =>
      second.count - first.count || second.createdAt.localeCompare(first.createdAt),
  );
}

/** Small blocklist of English and Portuguese insults, matched as whole words. */
const BLOCKED_WORDS = new Set([
  "fuck",
  "fucker",
  "fucking",
  "shit",
  "bitch",
  "cunt",
  "nigger",
  "nigga",
  "fag",
  "faggot",
  "porra",
  "caralho",
  "puta",
  "merda",
  "buceta",
  "viado",
  "cuzao",
  "arrombado",
  "nazi",
  "hitler",
]);

function hasBlockedWord(name: string): boolean {
  const words = name
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .split(/[^a-z0-9]+/);
  return words.some((word) => BLOCKED_WORDS.has(word));
}

/**
 * Trims, collapses whitespace and caps the length. Returns null when nothing usable is left, or
 * when the name has a blocked word or looks like a link (names are shown to every visitor).
 */
export function sanitizeName(rawName: string | undefined | null): string | null {
  const name = (rawName ?? "")
    // oxlint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f\u007f<>]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_NAME_LENGTH)
    .trim();
  if (name === "") {
    return null;
  }
  const lowered = name.toLowerCase();
  if (/https?:|www\.|\.(com|net|org|io|br)\b|@/.test(lowered)) {
    return null;
  }
  return hasBlockedWord(name) ? null : name;
}

export type NoteLabels = {
  oneVisitor: string;
  /** Contains `{count}`. */
  visitors: string;
  /** Contains `{names}` and `{count}`. */
  namesAndMore: string;
  and: string;
  /** Contains `{who}`; used when exactly one person recommended. */
  recommends: string;
  /** Contains `{who}`. */
  recommend: string;
  /** Ends the sentence and contains `{game}`. */
  because: string;
};

/** "Ana and 2 more recommend this, because I liked X." */
export function buildRecommendationNote(
  recommendation: Pick<RecommendationView, "count" | "names" | "becauseSlug">,
  likedTitle: string | undefined,
  labels: NoteLabels,
): string {
  const shownNames = recommendation.names.slice(0, MAX_SHOWN_NAMES);
  const unnamedCount = recommendation.count - shownNames.length;
  let who: string;
  if (shownNames.length === 0) {
    who =
      recommendation.count === 1
        ? labels.oneVisitor
        : labels.visitors.replace("{count}", String(recommendation.count));
  } else {
    const names = shownNames.join(labels.and);
    who =
      unnamedCount > 0
        ? labels.namesAndMore.replace("{names}", names).replace("{count}", String(unnamedCount))
        : names;
  }
  const verb = recommendation.count === 1 ? labels.recommends : labels.recommend;
  const sentence = verb.replace("{who}", who);
  return likedTitle ? `${sentence}${labels.because.replace("{game}", likedTitle)}` : `${sentence}.`;
}
