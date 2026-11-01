import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { FarewellBanner } from "@/layout/farewell-banner";
import { Footer } from "@/layout/footer";
import { Header } from "@/layout/header/header";
import { GamesSection } from "@/sections/games/games-section";
import { HeroSection } from "@/sections/hero/hero-section";
import { MusicSection } from "@/sections/music/music-section";
import { NbaSection } from "@/sections/nba/nba-section";
import { PlacesSection } from "@/sections/places/places-section";
import { resolveLocale } from "@/i18n/resolve-locale";
import { buildStructuredData, serializeJsonLd } from "@/lib/seo/structured-data";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = await resolveLocale(params);
  const t = await getTranslations("FarewellBanner");
  const tMetadata = await getTranslations("Metadata");
  const structuredData = buildStructuredData(locale, {
    title: tMetadata("title"),
    description: tMetadata("description"),
  });
  const tHeader = await getTranslations("Header");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <a
        href="#main"
        className="sr-only z-200 rounded-pill bg-accent px-5 py-3 font-medium text-on-accent no-underline focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {tHeader("skipToContent")}
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <HeroSection
          banner={
            <Suspense fallback={null}>
              <FarewellBanner
                label={t("label")}
                message={t("message")}
                dismissLabel={t("dismiss")}
              />
            </Suspense>
          }
        />
        <PlacesSection />
        <GamesSection />
        <NbaSection />
        <MusicSection />
      </main>
      <Footer />
    </>
  );
}
