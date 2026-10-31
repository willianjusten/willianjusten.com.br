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
