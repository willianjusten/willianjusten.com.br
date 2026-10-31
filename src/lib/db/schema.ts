import { integer, pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";

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
