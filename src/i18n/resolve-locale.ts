import { hasLocale, type Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "./routing";

/** Validates the `[locale]` route param and enables static rendering for it. */
export async function resolveLocale(localeParam: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await localeParam;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return locale;
}
