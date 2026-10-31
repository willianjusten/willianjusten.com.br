import type { Locale } from "next-intl";

export const SITE_URL = "https://willianjusten.com.br";

export function localeUrl(locale: Locale): string {
  return locale === "en" ? SITE_URL : `${SITE_URL}/${locale}`;
}
