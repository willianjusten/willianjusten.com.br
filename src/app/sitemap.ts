import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { hreflangAlternates, localeUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = hreflangAlternates(routing.locales);

  return routing.locales.map((locale) => ({
    url: localeUrl(locale),
    alternates: { languages },
  }));
}
