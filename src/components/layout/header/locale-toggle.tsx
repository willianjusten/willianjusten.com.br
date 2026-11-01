import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const localeShortLabels = { en: "EN", pt: "PT" } as const;

export async function LocaleToggle() {
  const activeLocale = await getLocale();
  const t = await getTranslations("LocaleToggle");
  const localeNames = { en: t("english"), pt: t("portuguese") } as const;

  return (
    <nav
      aria-label={t("label")}
      className="inline-flex items-center rounded-pill border border-line-strong bg-glass-chip p-0.5 font-mono text-eyebrow font-medium"
    >
      {routing.locales.map((locale) => {
        const isActive = locale === activeLocale;
        return (
          <Link
            key={locale}
            href="/"
            locale={locale}
            scroll={false}
            lang={locale}
            hrefLang={locale}
            aria-label={`${localeShortLabels[locale]}, ${localeNames[locale]}`}
            aria-current={isActive ? "true" : undefined}
            className={`inline-flex min-h-8 min-w-10 items-center justify-center rounded-pill px-2.5 no-underline transition-colors sm:min-h-10 sm:min-w-11 sm:px-3 ${
              isActive ? "bg-accent text-on-accent" : "text-text-muted"
            }`}
          >
            {localeShortLabels[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
