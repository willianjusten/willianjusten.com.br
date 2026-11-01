import { hasLocale, type Locale } from "next-intl";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

// The old photo albums and trips map now live in the Places section of the home page.
const RETIRED_HOSTS = ["photos.willianjusten.com.br", "my-trips.willianjusten.com.br"];

export function isRetiredHost(host: string): boolean {
  const hostname = host.split(":")[0].toLowerCase();
  return RETIRED_HOSTS.includes(hostname);
}

function preferredLocale(acceptLanguage: string | null): Locale {
  const rankedLanguages = (acceptLanguage ?? "")
    .split(",")
    .map((entry) => {
      const [tag, ...params] = entry.trim().split(";");
      const qualityParam = params.find((param) => param.trim().startsWith("q="));
      const quality = qualityParam ? Number(qualityParam.trim().slice(2)) : 1;
      return { language: tag.split("-")[0].toLowerCase(), quality };
    })
    .filter(({ quality }) => quality > 0)
    .sort((first, second) => second.quality - first.quality);

  const match = rankedLanguages
    .map(({ language }) => language)
    .find((language) => hasLocale(routing.locales, language));
  return match ?? routing.defaultLocale;
}

export function retiredHostDestination(acceptLanguage: string | null): string {
  const locale = preferredLocale(acceptLanguage);
  return locale === routing.defaultLocale ? `${SITE_URL}/#places` : `${SITE_URL}/${locale}#places`;
}
