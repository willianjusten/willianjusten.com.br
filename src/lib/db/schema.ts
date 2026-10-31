import { integer, pgEnum, pgTable, primaryKey, serial, text, timestamp } from "drizzle-orm/pg-core";

/** Single row (id = 1) holding the site-wide shot totals for the NBA game. */
export const nbaShotStats = pgTable("nba_shot_stats", {
  id: integer("id").primaryKey().default(1),
  shots: integer("shots").notNull().default(0),
  makes: integer("makes").notNull().default(0),
});

/** One row per browser per game: the "played it too" style reaction. Toggling off deletes the row. */
export const gameReactions = pgTable(
  "game_reactions",
  {
    gameSlug: text("game_slug").notNull(),
    browserId: text("browser_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.gameSlug, table.browserId] })],
);

/** One counter per route, hashed visitor and time window. Only the HMAC of the IP is stored. */
export const rateLimits = pgTable(
  "rate_limits",
  {
    routeKey: text("route_key").notNull(),
    ipHash: text("ip_hash").notNull(),
    windowStart: timestamp("window_start", { withTimezone: true }).notNull(),
    hits: integer("hits").notNull().default(0),
  },
  (table) => [primaryKey({ columns: [table.routeKey, table.ipHash, table.windowStart] })],
);

export const recommendationStatus = pgEnum("recommendation_status", [
  "pending",
  "approved",
  "hidden",
]);

/**
 * One row per recommended game. New games start `pending`; Will sets `approved` or `hidden`
 * directly in the Neon console.
 */
export const gameRecommendations = pgTable("game_recommendations", {
  id: serial("id").primaryKey(),
  igdbId: integer("igdb_id").notNull().unique(),
  title: text("title").notNull(),
  year: integer("year"),
  platform: text("platform").notNull(),
  coverImageId: text("cover_image_id"),
  status: recommendationStatus("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** One row per browser per recommendation. The first vote is the submission itself. */
export const gameRecommendationVotes = pgTable(
  "game_recommendation_votes",
  {
    recommendationId: integer("recommendation_id")
      .notNull()
      .references(() => gameRecommendations.id, { onDelete: "cascade" }),
    browserId: text("browser_id").notNull(),
    name: text("name"),
    /** Slug of the played or playing game the visitor says this one is like. */
    becauseSlug: text("because_slug"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.recommendationId, table.browserId] })],
);
