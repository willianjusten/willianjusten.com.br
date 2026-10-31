import { describe, expect, it } from "vitest";
import { z } from "zod";
import { contentModules, defineContentModule } from "./registry";

describe("content registry", () => {
  it("parses every registered content module against its zod schema", () => {
    for (const contentModule of contentModules) {
      const result = contentModule.schema.safeParse(contentModule.data);
      expect(result.error, `content module "${contentModule.name}"`).toBeUndefined();
    }
  });

  it("reports a module whose data does not match its schema", () => {
    const invalidModule = defineContentModule({
      name: "invalid-example",
      schema: z.object({ title: z.string() }),
      data: { title: 42 } as unknown as { title: string },
    });

    expect(invalidModule.schema.safeParse(invalidModule.data).success).toBe(false);
  });
});

describe("places content module", () => {
  const placesModule = contentModules.find((contentModule) => contentModule.name === "places");
  const seededPlaces =
    (placesModule?.data as { places: Record<string, unknown>[] } | undefined)?.places ?? [];

  it("is registered and seeds exactly one home place", () => {
    expect(placesModule).toBeDefined();
    expect(seededPlaces.filter((place) => place.isHome)).toHaveLength(1);
  });

  it("rejects a latitude outside the globe", () => {
    const parsed = placesModule?.schema.safeParse({
      places: [{ ...seededPlaces[0], lat: 120 }],
    });
    expect(parsed?.success).toBe(false);
  });
});

describe("profile content module", () => {
  const profileModule = contentModules.find((contentModule) => contentModule.name === "profile");
  const profileData = profileModule?.data as {
    links: object;
    now: { playing: object };
  };

  it("is registered", () => {
    expect(profileModule).toBeDefined();
  });

  it("rejects a link whose href is not a URL", () => {
    const parsed = profileModule?.schema.safeParse({
      ...profileData,
      links: { ...profileData.links, github: { href: "nope" } },
    });
    expect(parsed?.success).toBe(false);
  });

  it("rejects an unknown value that is not written as a [placeholder]", () => {
    const parsed = profileModule?.schema.safeParse({
      ...profileData,
      now: { ...profileData.now, playing: { ...profileData.now.playing, hours: "TBD" } },
    });
    expect(parsed?.success).toBe(false);
  });
});

describe("music content module", () => {
  const musicModule = contentModules.find((contentModule) => contentModule.name === "music");
  const musicData = musicModule?.data as { songOfTheMoment: string; tracks: { id: string }[] };

  it("is registered", () => {
    expect(musicModule).toBeDefined();
  });

  it("rejects a song of the moment that is not a listed track", () => {
    const parsed = musicModule?.schema.safeParse({ ...musicData, songOfTheMoment: "missing" });
    expect(parsed?.success).toBe(false);
  });

  it("rejects duplicate track ids", () => {
    const parsed = musicModule?.schema.safeParse({
      ...musicData,
      tracks: [...musicData.tracks, musicData.tracks[0]],
    });
    expect(parsed?.success).toBe(false);
  });

  it("rejects a streaming link that is not a URL", () => {
    const [firstTrack, ...otherTracks] = musicData.tracks;
    const parsed = musicModule?.schema.safeParse({
      ...musicData,
      tracks: [{ ...firstTrack, spotifyUrl: "nope" }, ...otherTracks],
    });
    expect(parsed?.success).toBe(false);
  });
});
