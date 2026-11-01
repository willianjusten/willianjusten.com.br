import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { FarewellBanner } from "@/components/farewell-banner";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { NbaSection } from "@/components/nba-section";
import { GamesSection, MusicSection, PlacesSection } from "@/components/section-shells";
import { resolveLocale } from "@/i18n/resolve-locale";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  await resolveLocale(params);
  const t = await getTranslations("FarewellBanner");
  const tHeader = await getTranslations("Header");

  return (
    <>
      <a
        href="#main"
        className="sr-only z-200 rounded-pill bg-accent px-5 py-3 font-medium text-on-accent no-underline focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        {tHeader("skipToContent")}
      </a>
      <Header />
      <Suspense fallback={null}>
        <FarewellBanner label={t("label")} message={t("message")} dismissLabel={t("dismiss")} />
      </Suspense>
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <PlacesSection />
        <GamesSection />
        <NbaSection />
        <MusicSection />
      </main>
      <Footer />
    </>
  );
}
