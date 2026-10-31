import { z } from "zod";

/** Unknown values are written as `[like this]` so they render visibly until Will fills them in. */
const PLACEHOLDER_PATTERN = /^\[.+\]$/;
const placeholderText = z.string().regex(PLACEHOLDER_PATTERN);
const localizedText = z.object({ en: z.string().min(1), pt: z.string().min(1) });
const colorHex = z.string().regex(/^#[0-9a-fA-F]{6}$/);

const placeSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  country: z.string().min(1),
  /** The trip year, a visible `[placeholder]` while unknown, or absent for home. */
  year: z.union([z.number().int().min(1900).max(2100), placeholderText]).optional(),
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
  isHome: z.boolean().default(false),
  /** Cloudinary folder holding the photos, `trips/<year>-<slug>`. */
  cloudinaryFolder: z.string().min(1),
  unsplashUrl: z.url(),
  pexelsUrl: z.url(),
  caption: localizedText,
  /** Stand-in pin card colour until the place has an album photo. */
  color: colorHex,
});

export const placesSchema = z.object({ places: z.array(placeSchema).min(1) });

export type Place = z.output<typeof placeSchema>;

const UNSPLASH_HOME_URL = "https://unsplash.com/";
const PEXELS_HOME_URL = "https://www.pexels.com/";

export const placesData: z.input<typeof placesSchema> = {
  places: [
    {
      slug: "sao-paulo",
      name: "São Paulo",
      country: "Brazil",
      lat: -23.55,
      lon: -46.63,
      isHome: true,
      cloudinaryFolder: "trips/home-sao-paulo",
      unsplashUrl: UNSPLASH_HOME_URL,
      pexelsUrl: PEXELS_HOME_URL,
      caption: {
        en: "Home. Concrete, rain and the best food in the world.",
        pt: "Casa. Concreto, chuva e a melhor comida do mundo.",
      },
      color: "#1E2433",
    },
    {
      slug: "paris",
      name: "Paris",
      country: "France",
      year: "[year]",
      lat: 48.86,
      lon: 2.35,
      cloudinaryFolder: "trips/paris",
      unsplashUrl: UNSPLASH_HOME_URL,
      pexelsUrl: PEXELS_HOME_URL,
      caption: { en: "[Caption]", pt: "[Legenda]" },
      color: "#3A3024",
    },
    {
      slug: "brussels",
      name: "Brussels",
      country: "Belgium",
      year: "[year]",
      lat: 50.85,
      lon: 4.35,
      cloudinaryFolder: "trips/brussels",
      unsplashUrl: UNSPLASH_HOME_URL,
      pexelsUrl: PEXELS_HOME_URL,
      caption: { en: "[Caption]", pt: "[Legenda]" },
      color: "#3A2A30",
    },
    {
      slug: "bruges",
      name: "Bruges",
      country: "Belgium",
      year: "[year]",
      lat: 51.21,
      lon: 3.22,
      cloudinaryFolder: "trips/bruges",
      unsplashUrl: UNSPLASH_HOME_URL,
      pexelsUrl: PEXELS_HOME_URL,
      caption: { en: "[Caption]", pt: "[Legenda]" },
      color: "#24363A",
    },
    {
      slug: "dinant",
      name: "Dinant",
      country: "Belgium",
      year: "[year]",
      lat: 50.26,
      lon: 4.91,
      cloudinaryFolder: "trips/dinant",
      unsplashUrl: UNSPLASH_HOME_URL,
      pexelsUrl: PEXELS_HOME_URL,
      caption: { en: "[Caption]", pt: "[Legenda]" },
      color: "#2C3A24",
    },
    {
      slug: "amsterdam",
      name: "Amsterdam",
      country: "Netherlands",
      year: 2026,
      lat: 52.37,
      lon: 4.9,
      cloudinaryFolder: "trips/2026-amsterdam",
      unsplashUrl: UNSPLASH_HOME_URL,
      pexelsUrl: PEXELS_HOME_URL,
      caption: { en: "[Caption]", pt: "[Legenda]" },
      color: "#33283E",
    },
    {
      slug: "china",
      name: "China",
      country: "China",
      year: 2025,
      lat: 35,
      lon: 104,
      cloudinaryFolder: "trips/2025-china",
      unsplashUrl: UNSPLASH_HOME_URL,
      pexelsUrl: PEXELS_HOME_URL,
      caption: { en: "[Caption]", pt: "[Legenda]" },
      color: "#3E3424",
    },
  ],
};

export const places: Place[] = placesSchema.parse(placesData).places;
