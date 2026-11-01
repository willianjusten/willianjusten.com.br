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
const RATING_STEP = 0.5;

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
  /** Stars out of `MAX_RATING`, in half steps, for a played game; none shows until it is set. */
  rating: z.number().min(RATING_STEP).max(MAX_RATING).multipleOf(RATING_STEP).optional(),
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
      slug: "control-resonant",
      title: "Control Resonant",
      platform: "rog",
      list: "played",
      year: 2026,
      rating: 5,
      tone: "#3A1E1E",
    },
    {
      slug: "yooka-replaylee",
      title: "Yooka-Replaylee",
      platform: "rog",
      list: "played",
      year: 2026,
      rating: 3.5,
      tone: "#2E4A24",
    },
    {
      slug: "onimusha-way-of-the-sword",
      title: "Onimusha: Way of the Sword",
      platform: "ps5",
      list: "played",
      year: 2026,
      rating: 4.5,
      tone: "#3A2C1E",
    },
    {
      slug: "resonance-a-plague-tale-legacy",
      title: "Resonance: A Plague Tale Legacy",
      platform: "xbox",
      list: "played",
      year: 2026,
      rating: 5,
      tone: "#2E3A3A",
    },
    {
      slug: "brotato",
      title: "Brotato",
      platform: "xbox",
      list: "played",
      year: 2026,
      rating: 5,
      tone: "#33302A",
    },
    {
      slug: "ninja-gaiden-4",
      title: "Ninja Gaiden 4",
      platform: "xbox",
      list: "played",
      year: 2026,
      rating: 4.5,
      tone: "#2A2E4A",
    },
    {
      slug: "donkey-kong-bananza",
      title: "Donkey Kong Bananza",
      platform: "switch2",
      list: "played",
      year: 2026,
      rating: 4,
      tone: "#4A2A1E",
    },
    {
      slug: "metroid-prime-4-beyond",
      title: "Metroid Prime 4: Beyond",
      platform: "switch2",
      list: "played",
      year: 2026,
      rating: 4,
      tone: "#3A2C52",
    },
    {
      slug: "ball-x-pit",
      title: "Ball x Pit",
      platform: "rog",
      list: "played",
      year: 2026,
      rating: 4,
      tone: "#52201E",
    },
    {
      slug: "pragmata",
      title: "Pragmata",
      platform: "rog",
      list: "played",
      year: 2026,
      rating: 4.5,
      tone: "#2E3442",
    },
    {
      slug: "saros",
      title: "Saros",
      platform: "ps5",
      list: "played",
      year: 2026,
      rating: 4,
      tone: "#4A3A1E",
    },
    {
      slug: "resident-evil-requiem",
      title: "Resident Evil Requiem",
      platform: "ps5",
      list: "played",
      year: 2026,
      rating: 4.5,
      tone: "#3A2A2A",
    },
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
