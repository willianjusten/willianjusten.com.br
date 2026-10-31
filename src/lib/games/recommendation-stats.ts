import { and, count, desc, eq, inArray, or } from "drizzle-orm";
import { GAME_PLATFORMS } from "@/content/games";
import type { GamePlatform } from "@/content/games";
import type { Database } from "@/lib/db/client";
import { gameRecommendations, gameRecommendationVotes } from "@/lib/db/schema";
import { buildCoverUrl, pickPrimaryPlatform } from "./igdb";
import type { IgdbGame } from "./igdb";
import { MAX_NAME_LENGTH, sortRecommendations } from "./recommendations";
import type { RecommendationView } from "./recommendations";

type RecommendationRow = typeof gameRecommendations.$inferSelect;
type VoteRow = typeof gameRecommendationVotes.$inferSelect;

const MAX_SHOWN_NAMES = 2;

function isGamePlatform(value: string): value is GamePlatform {
  return (GAME_PLATFORMS as readonly string[]).includes(value);
}

/** Pure: turns rows into what the browser may see. Hidden rows must be filtered out before. */
export function buildRecommendationViews(
  recommendations: readonly RecommendationRow[],
  votes: readonly VoteRow[],
  browserId: string | undefined,
): RecommendationView[] {
  const votesByRecommendation = Map.groupBy(votes, (vote) => vote.recommendationId);
  const views = recommendations.flatMap((recommendation): RecommendationView[] => {
    if (recommendation.status === "hidden" || !isGamePlatform(recommendation.platform)) {
      return [];
    }
    const newestFirst = [...(votesByRecommendation.get(recommendation.id) ?? [])].sort(
      (first, second) => second.createdAt.getTime() - first.createdAt.getTime(),
    );
    if (newestFirst.length === 0) {
      return [];
    }
    const names = newestFirst
      .flatMap((vote) => vote.name ?? [])
      .filter((name, position, all) => all.indexOf(name) === position)
      .slice(0, MAX_SHOWN_NAMES);
    return [
      {
        id: recommendation.id,
        title: recommendation.title,
        year: recommendation.year,
        platform: recommendation.platform,
        coverUrl: recommendation.coverImageId ? buildCoverUrl(recommendation.coverImageId) : null,
        status: recommendation.status,
        count: newestFirst.length,
        names,
        becauseSlug: newestFirst.find((vote) => vote.becauseSlug)?.becauseSlug ?? null,
        mine: browserId !== undefined && newestFirst.some((vote) => vote.browserId === browserId),
        createdAt: recommendation.createdAt.toISOString(),
      },
    ];
  });
  return sortRecommendations(views);
}

async function readVotes(database: Database, recommendationIds: number[]): Promise<VoteRow[]> {
  if (recommendationIds.length === 0) {
    return [];
  }
  return database
    .select()
    .from(gameRecommendationVotes)
    .where(inArray(gameRecommendationVotes.recommendationId, recommendationIds));
}

/** Approved games for everyone, plus this browser's own pending ones. */
export async function readRecommendations(
  database: Database,
  browserId: string | undefined,
): Promise<RecommendationView[]> {
  const ownVotes = browserId
    ? database
        .select({ recommendationId: gameRecommendationVotes.recommendationId })
        .from(gameRecommendationVotes)
        .where(eq(gameRecommendationVotes.browserId, browserId))
    : undefined;
  const rows = await database
    .select()
    .from(gameRecommendations)
    .where(
      ownVotes
        ? or(
            eq(gameRecommendations.status, "approved"),
            and(
              eq(gameRecommendations.status, "pending"),
              inArray(gameRecommendations.id, ownVotes),
            ),
          )
        : eq(gameRecommendations.status, "approved"),
    )
    .orderBy(desc(gameRecommendations.createdAt));
  const votes = await readVotes(
    database,
    rows.map((row) => row.id),
  );
  return buildRecommendationViews(rows, votes, browserId);
}

async function readRecommendation(
  database: Database,
  recommendationId: number,
  browserId: string,
): Promise<RecommendationView | undefined> {
  const [row] = await database
    .select()
    .from(gameRecommendations)
    .where(eq(gameRecommendations.id, recommendationId));
  if (!row) {
    return undefined;
  }
  const votes = await readVotes(database, [row.id]);
  return buildRecommendationViews([row], votes, browserId)[0];
}

export type NewRecommendation = {
  game: IgdbGame;
  browserId: string;
  name: string | null;
  becauseSlug: string;
};

/**
 * Saves a game as `pending` the first time anyone recommends it, then records this browser's
 * vote. Idempotent per browser. Returns undefined when Will has hidden the game.
 */
export async function submitRecommendation(
  database: Database,
  { game, browserId, name, becauseSlug }: NewRecommendation,
): Promise<RecommendationView | undefined> {
  const platform = pickPrimaryPlatform(game.platforms);
  if (!platform) {
    return undefined;
  }
  await database
    .insert(gameRecommendations)
    .values({
      igdbId: game.igdbId,
      title: game.title,
      year: game.year,
      platform,
      coverImageId: game.coverImageId,
    })
    .onConflictDoNothing({ target: gameRecommendations.igdbId });
  const [recommendation] = await database
    .select()
    .from(gameRecommendations)
    .where(eq(gameRecommendations.igdbId, game.igdbId));
  if (recommendation.status === "hidden") {
    return undefined;
  }
  await database
    .insert(gameRecommendationVotes)
    .values({
      recommendationId: recommendation.id,
      browserId,
      name: name?.slice(0, MAX_NAME_LENGTH) ?? null,
      becauseSlug,
    })
    .onConflictDoNothing();
  return readRecommendation(database, recommendation.id, browserId);
}

export type VoteOutcome = { kind: "ok"; count: number } | { kind: "not_approved" };

/** +1 or undo on an approved game. Idempotent per browser. */
export async function setRecommendationVote(
  database: Database,
  recommendationId: number,
  browserId: string,
  voted: boolean,
): Promise<VoteOutcome> {
  const [row] = await database
    .select({ status: gameRecommendations.status })
    .from(gameRecommendations)
    .where(eq(gameRecommendations.id, recommendationId));
  if (row?.status !== "approved") {
    return { kind: "not_approved" };
  }
  if (voted) {
    await database
      .insert(gameRecommendationVotes)
      .values({ recommendationId, browserId })
      .onConflictDoNothing();
  } else {
    await database
      .delete(gameRecommendationVotes)
      .where(
        and(
          eq(gameRecommendationVotes.recommendationId, recommendationId),
          eq(gameRecommendationVotes.browserId, browserId),
        ),
      );
  }
  const [total] = await database
    .select({ total: count() })
    .from(gameRecommendationVotes)
    .where(eq(gameRecommendationVotes.recommendationId, recommendationId));
  return { kind: "ok", count: total?.total ?? 0 };
}
