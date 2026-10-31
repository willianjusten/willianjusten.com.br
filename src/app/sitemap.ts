import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localeUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, localeUrl(locale)]),
  );

  return routing.locales.map((locale) => ({
    url: localeUrl(locale),
    alternates: { languages },
  }));
}
