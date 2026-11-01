import { describe, expect, it } from "vitest";
import { countPlaces, formatPhotoLine } from "../lib/places-board";

const home = { country: "Brazil", isHome: true, photos: [] };

function trip(country: string, photoCount: number) {
  return { country, isHome: false, photos: Array.from({ length: photoCount }, () => ({})) };
}

describe("countPlaces", () => {
  it("counts distinct countries and trip places, leaving home out, padded to two digits", () => {
    const counters = countPlaces([home, trip("Brazil", 7), trip("Brazil", 10), trip("Peru", 2)]);

    expect(counters).toEqual({ countries: "02", cities: "03", photos: "19" });
  });

  it("keeps counts past 99 whole", () => {
    expect(countPlaces([trip("Austria", 120)]).photos).toBe("120");
  });
});

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
