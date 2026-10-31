import { describe, expect, it } from "vitest";
import oldPostSlugs from "../../data/legacy/old-post-slugs.json";
import { buildRetirementRedirects } from "./retirement-redirects";

const rules = buildRetirementRedirects(oldPostSlugs);

function ruleFor(source: string) {
  return rules.find((rule) => rule.source === source);
}

describe("blog retirement redirects", () => {
  it("sends every old post, with and without a trailing slash, to /pt?from=blog", () => {
    expect(oldPostSlugs.length).toBeGreaterThan(0);
    for (const slug of oldPostSlugs) {
      for (const source of [`/${slug}`, `/${slug}/`]) {
        expect(ruleFor(source)).toEqual({
          source,
          destination: "/pt?from=blog",
          permanent: true,
        });
      }
    }
  });

  it("sends old index, pagination, tag, about, courses, series and search routes home", () => {
    for (const source of [
      "/page/:path*",
      "/tags/:path*",
      "/about",
      "/cursos",
      "/series",
      "/search",
    ]) {
      expect(ruleFor(source)).toMatchObject({ destination: "/", permanent: true });
    }
  });

  it("does not match assets or unknown paths", () => {
    const sources = rules.map((rule) => rule.source);
    expect(sources.some((source) => /\.\w+$/.test(source))).toBe(false);
    expect(sources).not.toContain("/:slug");
    expect(sources).not.toContain("/:path*");
  });
});
