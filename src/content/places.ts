import { z } from "zod";
import { profileData } from "./profile.ts";

const localizedText = z.object({ en: z.string().min(1), pt: z.string().min(1) });
const colorHex = z.string().regex(/^#[0-9a-fA-F]{6}$/);
const TRIP_FOLDER_PATTERN = /^trips\/\d{4}-[a-z0-9-]+$/;

const placeSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    name: z.string().min(1),
    country: z.string().min(1),
    /** The trip year; absent for home. */
    year: z.number().int().min(1900).max(2100).optional(),
    lat: z.number().min(-90).max(90),
    lon: z.number().min(-180).max(180),
    isHome: z.boolean().default(false),
    /** Cloudinary folder holding the album, `trips/<year>-<slug>`; absent for home, which has no album. */
    cloudinaryFolder: z.string().regex(TRIP_FOLDER_PATTERN).optional(),
    unsplashUrl: z.url(),
    pexelsUrl: z.url(),
    /** Shown under the album title; hidden while not written yet. */
    caption: localizedText.optional(),
    /** Stand-in pin card colour while the place has no album photo. */
    color: colorHex,
  })
  .refine((place) => place.isHome || (place.cloudinaryFolder && place.year), {
    message: "A trip needs a year and a Cloudinary folder",
  });

export const placesSchema = z.object({ places: z.array(placeSchema).min(1) });

export type Place = z.output<typeof placeSchema>;

const UNSPLASH_PROFILE_URL = profileData.links.unsplash.href;
const PEXELS_PROFILE_URL = profileData.links.pexels.href;

export const placesData: z.input<typeof placesSchema> = {
  places: [
    {
      slug: "sao-paulo",
      name: "São Paulo",
      country: "Brazil",
      lat: -23.55,
      lon: -46.63,
      isHome: true,
      unsplashUrl: UNSPLASH_PROFILE_URL,
      pexelsUrl: PEXELS_PROFILE_URL,
      caption: {
        en: "Home. Concrete, rain and the best food in the world.",
        pt: "Casa. Concreto, chuva e a melhor comida do mundo.",
      },
      color: "#1E2433",
    },
    {
      slug: "petropolis",
      name: "Petrópolis",
      country: "Brazil",
      year: 2016,
      lat: -22.51,
      lon: -43.18,
      cloudinaryFolder: "trips/2016-petropolis",
      unsplashUrl: UNSPLASH_PROFILE_URL,
      pexelsUrl: PEXELS_PROFILE_URL,
      color: "#2C3A24",
    },
    {
      slug: "austria",
      name: "Austria",
      country: "Austria",
      year: 2017,
      lat: 47.5,
      lon: 14.5,
      cloudinaryFolder: "trips/2017-austria",
      unsplashUrl: UNSPLASH_PROFILE_URL,
      pexelsUrl: PEXELS_PROFILE_URL,
      color: "#24363A",
    },
    {
      slug: "buenos-aires",
      name: "Buenos Aires",
      country: "Argentina",
      year: 2017,
      lat: -34.6,
      lon: -58.38,
      cloudinaryFolder: "trips/2017-buenos-aires",
      unsplashUrl: UNSPLASH_PROFILE_URL,
      pexelsUrl: PEXELS_PROFILE_URL,
      color: "#3A2A30",
    },
    {
      slug: "peru",
      name: "Peru",
      country: "Peru",
      year: 2018,
      lat: -9.2,
      lon: -75,
      cloudinaryFolder: "trips/2018-peru",
      unsplashUrl: UNSPLASH_PROFILE_URL,
      pexelsUrl: PEXELS_PROFILE_URL,
      color: "#3E3424",
    },
    {
      slug: "porto-de-galinhas",
      name: "Porto de Galinhas",
      country: "Brazil",
      year: 2019,
      lat: -8.5,
      lon: -35,
      cloudinaryFolder: "trips/2019-porto-de-galinhas",
      unsplashUrl: UNSPLASH_PROFILE_URL,
      pexelsUrl: PEXELS_PROFILE_URL,
      color: "#33283E",
    },
  ],
};

export const places: Place[] = placesSchema.parse(placesData).places;
