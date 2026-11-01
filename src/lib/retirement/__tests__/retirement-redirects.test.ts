import { describe, expect, it } from "vitest";
import oldPostSlugs from "../../../../data/legacy/old-post-slugs.json";
import { KEPT_REDIRECTS, buildRetirementRedirects } from "../retirement-redirects";

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
          statusCode: 301,
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
      expect(ruleFor(source)).toMatchObject({ destination: "/", statusCode: 301 });
    }
  });

  it("does not match assets or unknown paths", () => {
    const sources = rules.map((rule) => rule.source);
    expect(sources.some((source) => /\.\w+$/.test(source))).toBe(false);
    expect(sources).not.toContain("/:slug");
    expect(sources).not.toContain("/:path*");
  });

  it("sends the old my-trips page to the Portuguese places section", () => {
    for (const source of ["/my-trips", "/my-trips/"]) {
      expect(KEPT_REDIRECTS).toContainEqual({
        source,
        destination: "/pt#places",
        statusCode: 301,
      });
    }
  });
});
