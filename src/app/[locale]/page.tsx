import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { GamesSection, MusicSection, NbaSection, PlacesSection } from "@/components/section-shells";
import { resolveLocale } from "@/i18n/resolve-locale";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  await resolveLocale(params);

  return (
    <>
      <Header />
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
