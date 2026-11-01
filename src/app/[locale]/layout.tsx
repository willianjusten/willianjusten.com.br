import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { resolveLocale } from "@/i18n/resolve-locale";
import { routing } from "@/i18n/routing";
import { Analytics } from "@/components/analytics";
import { profile, xHandle } from "@/content/profile";
import { hreflangAlternates, localeUrl, SITE_URL } from "@/lib/site";
import "../globals.css";
import "../frame.css";
import "../music.css";
import "../games.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localeUrl(locale),
      languages: hreflangAlternates(routing.locales),
      types: { "application/rss+xml": `${SITE_URL}/feed.xml` },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: localeUrl(locale),
      siteName: "Willian Justen",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      site: xHandle(profile.links.x.href),
      creator: xHandle(profile.links.x.href),
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const locale = await resolveLocale(params);

  return (
    <html
      lang={locale}
      className={`${bricolage.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <div className="page">{children}</div>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
