import type { GameList, GamePlatform } from "@/content/games";
import { fillTemplate } from "@/lib/fill-template";
import type { ShelfGame } from "./games-board";
import type { RecommendationView } from "./recommendations";
import { filterShelf, type PlatformFilter } from "./shelf";

export type ShelfList = GameList | "recommended";

export const SHELF_LISTS: readonly ShelfList[] = ["playing", "played", "wishlist", "recommended"];

export type CaseEntry = {
  title: string;
  platform: GamePlatform;
  tone: string;
  coverUrl?: string | null;
  /** Pill above the title, e.g. "recommended x3". */
  sticker?: string;
};

type ReactionTarget =
  | { kind: "game"; gameSlug: string }
  | { kind: "recommendation"; recommendationId: number };

export type ShelfCase = {
  key: string;
  entry: CaseEntry;
  year: number | string | null;
  badgeText: string;
  note: string;
  rating: number | null;
  showLabel: string;
  reaction: { pressed: boolean; count: number; isEnabled: boolean; target: ReactionTarget };
  canRecommendSimilar: boolean;
};

export type ShelfCaseLabels = {
  /** Contains `{count}`. */
  sticker: string;
  pendingSticker: string;
  pendingNote: string;
  soon: string;
  /** Contains `{title}`. */
  showGame: string;
};

type ShelfCaseSources = {
  list: ShelfList;
  platform: PlatformFilter;
  games: readonly ShelfGame[];
  recommendations: readonly RecommendationView[];
  reactionCounts: Readonly<Record<string, number>>;
  myReactions: ReadonlySet<string>;
  labels: ShelfCaseLabels;
};

function recommendationCase(
  recommendation: RecommendationView,
  labels: ShelfCaseLabels,
): ShelfCase {
  const isPending = recommendation.status === "pending";
  return {
    key: `recommendation-${recommendation.id}`,
    entry: {
      title: recommendation.title,
      platform: recommendation.platform,
      tone: "var(--surface-hover)",
      coverUrl: recommendation.coverUrl,
      sticker: isPending
        ? labels.pendingSticker
        : fillTemplate(labels.sticker, { count: recommendation.count }),
    },
    year: recommendation.year,
    badgeText: `×${recommendation.count}`,
    note: isPending ? labels.pendingNote : "",
    rating: null,
    showLabel: fillTemplate(labels.showGame, { title: recommendation.title }),
    reaction: {
      pressed: recommendation.mine,
      count: recommendation.count,
      isEnabled: !isPending,
      target: { kind: "recommendation", recommendationId: recommendation.id },
    },
    canRecommendSimilar: false,
  };
}

function gameCase(
  game: ShelfGame,
  sources: Pick<ShelfCaseSources, "reactionCounts" | "myReactions" | "labels">,
): ShelfCase {
  return {
    key: game.slug,
    entry: game,
    year: game.year ?? null,
    badgeText: game.list === "wishlist" ? sources.labels.soon : String(game.year),
    note: game.note,
    rating: game.list === "played" ? (game.rating ?? null) : null,
    showLabel: fillTemplate(sources.labels.showGame, { title: game.title }),
    reaction: {
      pressed: sources.myReactions.has(game.slug),
      count: sources.reactionCounts[game.slug] ?? 0,
      isEnabled: true,
      target: { kind: "game", gameSlug: game.slug },
    },
    canRecommendSimilar: game.list !== "wishlist",
  };
}

export function buildShelfCases(sources: ShelfCaseSources): ShelfCase[] {
  if (sources.list === "recommended") {
    return sources.recommendations.map((recommendation) =>
      recommendationCase(recommendation, sources.labels),
    );
  }
  return filterShelf(sources.games, sources.list, sources.platform).map((game) =>
    gameCase(game, sources),
  );
}
