import { ArrowUpRight, MapPin } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { places } from "@/content/places";
import { profile } from "@/content/profile";
import { tripPhotos } from "@/content/trip-photos";
import { ExternalLink } from "@/shared/components/external-link";
import { SectionShell } from "@/shared/components/section-shell";
import { LazyGlobe } from "./components/lazy-globe";
import { PlaceCounters } from "./components/place-counters";
import { buildGlobePlaces, countPlaces } from "./lib/places-board";

const PROFILE_CHIP_CLASS =
  "chip-link flex min-h-11 items-center gap-2 rounded-pill border border-line-strong px-5 text-small text-text no-underline";

function IntroLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <ExternalLink
      href={href}
      className="font-medium text-accent no-underline underline-offset-4 hover:text-accent-hi hover:underline"
    >
      {children}
    </ExternalLink>
  );
}

export async function PlacesSection() {
  const t = await getTranslations("Sections.places");
  const locale = await getLocale();
  const globePlaces = buildGlobePlaces(places, tripPhotos, locale);
  const counters = countPlaces(globePlaces);
  const profileChips = [
    { key: "unsplash", label: "Unsplash", href: profile.links.unsplash.href },
    { key: "pexels", label: "Pexels", href: profile.links.pexels.href },
  ];

  return (
    <SectionShell
      id="places"
      icon={MapPin}
      eyebrow={t("eyebrow")}
      title={t("title")}
      intro={t.rich("intro", {
        unsplash: (label) => <IntroLink href={profile.links.unsplash.href}>{label}</IntroLink>,
        pexels: (label) => <IntroLink href={profile.links.pexels.href}>{label}</IntroLink>,
      })}
      headerAside={
        <div className="flex flex-col items-start gap-5">
          <PlaceCounters
            label={t("counters.label")}
            counters={[
              { key: "countries", value: counters.countries, label: t("counters.countries") },
              { key: "cities", value: counters.cities, label: t("counters.cities") },
              { key: "photos", value: counters.photos, label: t("counters.photos") },
            ]}
          />
          <div className="flex flex-wrap gap-2">
            {profileChips.map((chip) => (
              <ExternalLink key={chip.key} href={chip.href} className={PROFILE_CHIP_CLASS}>
                {chip.label}
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="nudge-arrow"
                />
              </ExternalLink>
            ))}
          </div>
        </div>
      }
    >
      <div className="mt-10">
        <LazyGlobe
          places={globePlaces}
          labels={{
            description: t("globe.description"),
            zoomIn: t("globe.zoomIn"),
            zoomOut: t("globe.zoomOut"),
            reset: t("globe.reset"),
            hint: t("globe.hint"),
            clusterOf: t("globe.clusterOf"),
            album: {
              label: t.raw("album.label"),
              home: t("album.home"),
              previous: t("album.previous"),
              next: t("album.next"),
              close: t("album.close"),
              closeViewer: t("album.closeViewer"),
              expand: t("album.expand"),
              counter: t.raw("album.counter"),
              thumbnails: t("album.thumbnails"),
              showPhoto: t.raw("album.showPhoto"),
              moreFrom: t.raw("album.moreFrom"),
            },
            tour: { play: t("tour.play"), stop: t("tour.stop") },
          }}
        />
        {/* The globe draws on a canvas, so crawlers without JavaScript get the places as text. */}
        <noscript>
          <ul>
            {places.map((place) => {
              const caption = place.caption?.[locale];
              return (
                <li key={place.slug}>
                  {place.name}, {place.country}
                  {caption ? `: ${caption}` : null}
                </li>
              );
            })}
          </ul>
        </noscript>
      </div>
    </SectionShell>
  );
}
