import { describe, expect, it } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("lists / and /pt, each with hreflang alternates for both locales", () => {
    const entries = sitemap();

    expect(entries.map((entry) => entry.url)).toEqual([
      "https://willianjusten.com.br",
      "https://willianjusten.com.br/pt",
    ]);
    for (const entry of entries) {
      expect(entry.alternates?.languages).toEqual({
        en: "https://willianjusten.com.br",
        pt: "https://willianjusten.com.br/pt",
        "x-default": "https://willianjusten.com.br",
      });
    }
  });
});

describe("robots", () => {
  it("allows everything and points to the sitemap", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://willianjusten.com.br/sitemap.xml",
    });
  });
});
