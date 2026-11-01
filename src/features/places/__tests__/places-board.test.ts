import { describe, expect, it } from "vitest";
import type { Place } from "@/content/places";
import { buildGlobePlaces, formatPhotoLine } from "../lib/places-board";

describe("formatPhotoLine", () => {
  it("joins the title and the camera settings with a separator", () => {
    const line = formatPhotoLine({
      title: "Eiffel at dusk",
      exif: { focalLength: "35mm", aperture: "f/2", shutter: "1/250s", iso: "ISO 160" },
    });

    expect(line).toEqual({ title: "Eiffel at dusk", details: "· 35mm · f/2 · 1/250s · ISO 160" });
  });

  it("shows the title alone, without the separator, when the photo has no EXIF", () => {
    expect(formatPhotoLine({ title: "Palace gardens" })).toEqual({ title: "Palace gardens" });
  });

  it("shows the settings alone, without a leading separator, when the photo has no title", () => {
    expect(formatPhotoLine({ exif: { camera: "Canon EOS 70D", year: "2016" } })).toEqual({
      details: "Canon EOS 70D · 2016",
    });
  });

  it("is empty when the photo has neither", () => {
    expect(formatPhotoLine({})).toEqual({});
  });
});

describe("buildGlobePlaces", () => {
  const photo = (publicId: string) => ({
    publicId,
    width: 1200,
    height: 800,
    blurDataUrl: "data:image/webp;base64,AA==",
  });
  const newYork: Place = {
    slug: "new-york",
    name: "New York",
    country: "United States",
    lat: 40.71,
    lon: -74.01,
    isHome: false,
    cloudinaryFolders: ["trips/2022-new-york", "trips/2025-new-york"],
    unsplashUrl: "https://unsplash.com/@example",
    pexelsUrl: "https://www.pexels.com/@example",
    color: "#3B2D26",
  };
  const tripPhotos = {
    cloudName: "demo",
    albums: {
      "trips/2022-new-york": [photo("trips/2022-new-york/a")],
      "trips/2025-new-york": [photo("trips/2025-new-york/b"), photo("trips/2025-new-york/c")],
    },
  };

  it("merges every visit of a place into one album, in folder order, with each visit year", () => {
    const [place] = buildGlobePlaces([newYork], tripPhotos, "en");
    expect(place.years).toEqual([2022, 2025]);
    expect(place.photos.map((albumPhoto) => albumPhoto.src.split("/").at(-1))).toEqual([
      "a",
      "b",
      "c",
    ]);
  });

  it("gives home no years and no photos", () => {
    const home: Place = { ...newYork, slug: "home", isHome: true, cloudinaryFolders: undefined };
    const [place] = buildGlobePlaces([home], tripPhotos, "en");
    expect(place.years).toEqual([]);
    expect(place.photos).toEqual([]);
  });
});
