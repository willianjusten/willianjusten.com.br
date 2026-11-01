import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { hreflangAlternates, localeUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = hreflangAlternates(routing.locales);
  // Both pages are prerendered, so the build time is when their content last changed.
  const lastModified = new Date();

  return routing.locales.map((locale) => ({
    url: localeUrl(locale),
    lastModified,
    changeFrequency: "weekly",
    alternates: { languages },
  }));
}
