import { describe, expect, it } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("lists / and /pt, each with a last-modified date and hreflang alternates for both locales", () => {
    const entries = sitemap();

    expect(entries.map((entry) => entry.url)).toEqual([
      "https://willianjusten.com.br",
      "https://willianjusten.com.br/pt",
    ]);
    for (const entry of entries) {
      expect(entry.lastModified).toBeInstanceOf(Date);
      expect(entry.alternates?.languages).toEqual({
        en: "https://willianjusten.com.br",
        pt: "https://willianjusten.com.br/pt",
        "x-default": "https://willianjusten.com.br",
      });
    }
  });
});

describe("robots", () => {
  it("allows every page, keeps crawlers out of the API and points to the sitemap", () => {
    const { rules, sitemap: sitemapUrl } = robots();

    expect(sitemapUrl).toBe("https://willianjusten.com.br/sitemap.xml");
    for (const rule of [rules].flat()) {
      expect(rule).toMatchObject({ allow: "/", disallow: "/api/" });
    }
  });

  it("names the AI answer-engine crawlers explicitly", () => {
    const userAgents = [robots().rules].flat().flatMap((rule) => [rule.userAgent].flat());

    expect(userAgents).toEqual(
      expect.arrayContaining(["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]),
    );
  });
});
