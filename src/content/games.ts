import { z } from "zod";

/** Unknown values are written as `[like this]` so they render visibly until Will fills them in. */
const PLACEHOLDER_PATTERN = /^\[.+\]$/;
const placeholderText = z.string().regex(PLACEHOLDER_PATTERN);
const localizedText = z.object({ en: z.string().min(1), pt: z.string().min(1) });
const colorHex = z.string().regex(/^#[0-9a-fA-F]{6}$/);

export const GAME_PLATFORMS = ["ps5", "xbox", "switch2", "rog", "pc"] as const;
export const GAME_LISTS = ["playing", "played", "wishlist"] as const;

/** Played games are rated out of this many stars. */
export const MAX_RATING = 5;

export type GamePlatform = (typeof GAME_PLATFORMS)[number];
export type GameList = (typeof GAME_LISTS)[number];

const gameSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  platform: z.enum(GAME_PLATFORMS),
  list: z.enum(GAME_LISTS),
  /** Release or play year, or a visible `[placeholder]` while unknown. */
  year: z.union([z.number().int().min(1970).max(2100), placeholderText]),
  /** One line under the title on the shelf; left out when there is nothing to say. */
  note: localizedText.optional(),
  /**
   * Pins the IGDB game for `pnpm games:covers` when the title search picks the wrong one
   * (or none). Usually left out.
   */
  igdbId: z.number().int().positive().optional(),
  /** Stars out of `MAX_RATING` for a played game; the shelf shows none until it is set. */
  rating: z.number().int().min(1).max(MAX_RATING).optional(),
  /** Case colour while there is no IGDB cover, and behind the cover while it loads. */
  tone: colorHex,
});

export const gamesSchema = z
  .object({ games: z.array(gameSchema).min(1) })
  .refine((value) => new Set(value.games.map((game) => game.slug)).size === value.games.length, {
    message: "Game slugs must be unique",
  });

export type Game = z.output<typeof gameSchema>;

const PLACEHOLDER_WHY = { en: "[Why it is on the list]", pt: "[Por que está na lista]" };

type GameInput = z.input<typeof gameSchema>;

type PlaceholderGameOptions = {
  slug: string;
  platform: GamePlatform;
  list: GameList;
  /** Case colour while there is no IGDB cover. */
  coverTone: string;
  note?: GameInput["note"];
};

function placeholderGame({
  slug,
  platform,
  list,
  coverTone,
  note,
}: PlaceholderGameOptions): GameInput {
  return { slug, title: "[Game title]", platform, list, year: "[year]", note, tone: coverTone };
}

export const gamesData: z.input<typeof gamesSchema> = {
  games: [
    {
      slug: "crimson-desert",
      title: "Crimson Desert",
      // IGDB names the base game "Crimson Desert Enhanced".
      igdbId: 125633,
      platform: "pc",
      list: "playing",
      year: 2026,
      tone: "#5A2A1E",
    },
    placeholderGame({
      slug: "playing-rog",
      platform: "rog",
      list: "playing",
      coverTone: "#1E3A52",
      note: {
        en: "The couch and travel game of the month.",
        pt: "O jogo de sofá e de viagem do mês.",
      },
    }),
    placeholderGame({
      slug: "playing-switch2",
      platform: "switch2",
      list: "playing",
      coverTone: "#4A2A24",
    }),
    {
      slug: "alan-wake-2",
      title: "Alan Wake 2",
      // IGDB spells it "Alan Wake II".
      igdbId: 185246,
      platform: "pc",
      list: "played",
      year: "[year]",
      rating: 5,
      tone: "#1E3434",
    },
    placeholderGame({
      slug: "played-ps5-a",
      platform: "ps5",
      list: "played",
      coverTone: "#3A2C52",
    }),
    placeholderGame({
      slug: "played-xbox-a",
      platform: "xbox",
      list: "played",
      coverTone: "#4A3A1E",
    }),
    placeholderGame({
      slug: "played-switch2-a",
      platform: "switch2",
      list: "played",
      coverTone: "#52203A",
    }),
    placeholderGame({
      slug: "played-rog-a",
      platform: "rog",
      list: "played",
      coverTone: "#20384A",
    }),
    placeholderGame({
      slug: "played-ps5-b",
      platform: "ps5",
      list: "played",
      coverTone: "#2E4A24",
    }),
    placeholderGame({
      slug: "played-xbox-b",
      platform: "xbox",
      list: "played",
      coverTone: "#2A2E4A",
    }),
    placeholderGame({
      slug: "played-switch2-b",
      platform: "switch2",
      list: "played",
      coverTone: "#33304A",
    }),
    placeholderGame({
      slug: "wishlist-ps5",
      platform: "ps5",
      list: "wishlist",
      coverTone: "#36402A",
      note: PLACEHOLDER_WHY,
    }),
    placeholderGame({
      slug: "wishlist-switch2",
      platform: "switch2",
      list: "wishlist",
      coverTone: "#4A2840",
      note: PLACEHOLDER_WHY,
    }),
    placeholderGame({
      slug: "wishlist-xbox",
      platform: "xbox",
      list: "wishlist",
      coverTone: "#1E3A52",
      note: PLACEHOLDER_WHY,
    }),
  ],
};

export const games = gamesSchema.parse(gamesData).games;
