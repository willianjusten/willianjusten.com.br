import { z } from "zod";

/** Unknown values are written as `[like this]` so they render visibly until Will fills them in. */
const PLACEHOLDER_PATTERN = /^\[.+\]$/;
const placeholderText = z.string().regex(PLACEHOLDER_PATTERN);
const localizedText = z.object({ en: z.string().min(1), pt: z.string().min(1) });
const colorHex = z.string().regex(/^#[0-9a-fA-F]{6}$/);

export const GAME_PLATFORMS = ["ps5", "xbox", "switch2", "rog", "pc"] as const;
export const GAME_LISTS = ["playing", "played", "wishlist"] as const;

export type GamePlatform = (typeof GAME_PLATFORMS)[number];
export type GameList = (typeof GAME_LISTS)[number];

const gameSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  platform: z.enum(GAME_PLATFORMS),
  list: z.enum(GAME_LISTS),
  /** Release or play year, or a visible `[placeholder]` while unknown. */
  year: z.union([z.number().int().min(1970).max(2100), placeholderText]),
  note: localizedText,
  /** IGDB image id of the cover (`co1abc`), resolved to a URL at render time. Absent until fetched. */
  igdbCoverId: z
    .string()
    .regex(/^[a-z0-9]+$/)
    .optional(),
  /** Stand-in cover colour until the IGDB cover is wired. */
  tone: colorHex,
});

export const gamesSchema = z
  .object({ games: z.array(gameSchema).min(1) })
  .refine((value) => new Set(value.games.map((game) => game.slug)).size === value.games.length, {
    message: "Game slugs must be unique",
  });

export type Game = z.output<typeof gameSchema>;

const PLACEHOLDER_NOTE = {
  en: "[One line on how it is going]",
  pt: "[Uma linha sobre como está indo]",
};
const PLACEHOLDER_VERDICT = { en: "[Your verdict in one line]", pt: "[Seu veredito em uma linha]" };
const PLACEHOLDER_WHY = { en: "[Why it is on the list]", pt: "[Por que está na lista]" };

type GameInput = z.input<typeof gameSchema>;

function placeholderGame(
  slug: string,
  platform: GamePlatform,
  list: GameList,
  tone: string,
  note: GameInput["note"],
): GameInput {
  return { slug, title: "[Game title]", platform, list, year: "[year]", note, tone };
}

export const gamesData: z.input<typeof gamesSchema> = {
  games: [
    {
      slug: "crimson-desert",
      title: "Crimson Desert",
      platform: "pc",
      list: "playing",
      year: 2026,
      note: PLACEHOLDER_NOTE,
      tone: "#5A2A1E",
    },
    placeholderGame("playing-rog", "rog", "playing", "#1E3A52", {
      en: "The couch and travel game of the month.",
      pt: "O jogo de sofá e de viagem do mês.",
    }),
    placeholderGame("playing-switch2", "switch2", "playing", "#4A2A24", PLACEHOLDER_NOTE),
    {
      slug: "alan-wake-2",
      title: "Alan Wake 2",
      platform: "pc",
      list: "played",
      year: "[year]",
      note: PLACEHOLDER_VERDICT,
      tone: "#1E3434",
    },
    placeholderGame("played-ps5-a", "ps5", "played", "#3A2C52", PLACEHOLDER_VERDICT),
    placeholderGame("played-xbox-a", "xbox", "played", "#4A3A1E", PLACEHOLDER_VERDICT),
    placeholderGame("played-switch2-a", "switch2", "played", "#52203A", PLACEHOLDER_VERDICT),
    placeholderGame("played-rog-a", "rog", "played", "#20384A", PLACEHOLDER_VERDICT),
    placeholderGame("played-ps5-b", "ps5", "played", "#2E4A24", PLACEHOLDER_VERDICT),
    placeholderGame("played-xbox-b", "xbox", "played", "#2A2E4A", PLACEHOLDER_VERDICT),
    placeholderGame("played-switch2-b", "switch2", "played", "#33304A", PLACEHOLDER_VERDICT),
    placeholderGame("wishlist-ps5", "ps5", "wishlist", "#36402A", PLACEHOLDER_WHY),
    placeholderGame("wishlist-switch2", "switch2", "wishlist", "#4A2840", PLACEHOLDER_WHY),
    placeholderGame("wishlist-xbox", "xbox", "wishlist", "#1E3A52", PLACEHOLDER_WHY),
  ],
};

export const games = gamesSchema.parse(gamesData).games;
