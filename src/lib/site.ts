import type { Locale } from "next-intl";

export const SITE_URL = "https://willianjusten.com.br";
export const COURTSIDE_URL = "https://courtside.willianjusten.com.br/";

export function localeUrl(locale: Locale): string {
  return locale === "en" ? SITE_URL : `${SITE_URL}/${locale}`;
}

/** hreflang map for every locale plus `x-default`, which points at the unprefixed English home. */
export function hreflangAlternates(locales: readonly Locale[]): Record<string, string> {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, localeUrl(locale)])),
    "x-default": SITE_URL,
  };
}
