import { and, count, eq } from "drizzle-orm";
import type { Database } from "@/lib/db/client";
import { gameReactions } from "@/lib/db/schema";

export type ReactionSnapshot = {
  /** Reaction count per game slug; games nobody reacted to are absent. */
  counts: Record<string, number>;
  /** Slugs this browser has reacted to. */
  mine: string[];
};

/** Idempotent: reacting twice or un-reacting twice leaves the same state. */
export async function setReaction(
  database: Database,
  gameSlug: string,
  browserId: string,
  reacted: boolean,
): Promise<{ count: number }> {
  if (reacted) {
    await database
      .insert(gameReactions)
      .values({ gameSlug, browserId })
      .onConflictDoNothing({ target: [gameReactions.gameSlug, gameReactions.browserId] });
  } else {
    await database
      .delete(gameReactions)
      .where(and(eq(gameReactions.gameSlug, gameSlug), eq(gameReactions.browserId, browserId)));
  }
  const [row] = await database
    .select({ total: count() })
    .from(gameReactions)
    .where(eq(gameReactions.gameSlug, gameSlug));
  return { count: row?.total ?? 0 };
}

export async function readReactions(
  database: Database,
  browserId: string | undefined,
): Promise<ReactionSnapshot> {
  const totals = await database
    .select({ gameSlug: gameReactions.gameSlug, total: count() })
    .from(gameReactions)
    .groupBy(gameReactions.gameSlug);
  const counts = Object.fromEntries(totals.map((row) => [row.gameSlug, row.total]));

  if (!browserId) {
    return { counts, mine: [] };
  }
  const owned = await database
    .select({ gameSlug: gameReactions.gameSlug })
    .from(gameReactions)
    .where(eq(gameReactions.browserId, browserId));
  return { counts, mine: owned.map((row) => row.gameSlug) };
}
