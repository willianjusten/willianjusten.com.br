import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { FarewellBanner } from "@/components/farewell-banner";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { GamesSection, MusicSection, NbaSection, PlacesSection } from "@/components/section-shells";
import { resolveLocale } from "@/i18n/resolve-locale";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  await resolveLocale(params);
  const t = await getTranslations("FarewellBanner");

  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <FarewellBanner label={t("label")} message={t("message")} dismissLabel={t("dismiss")} />
      </Suspense>
      <main>
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
