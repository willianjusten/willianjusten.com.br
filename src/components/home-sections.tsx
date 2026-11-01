import { ArrowUpRight, Gamepad2, MapPin, Music } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { gameCovers } from "@/content/game-covers";
import { games } from "@/content/games";
import { buildShelfEntries } from "@/content/games-board";
import { music } from "@/content/music";
import { buildMusicBoard } from "@/content/music-board";
import { musicPreviews } from "@/content/music-previews";
import { places } from "@/content/places";
import { buildGlobePlaces, countPlaces } from "@/content/places-board";
import { tripPhotos } from "@/content/trip-photos";
import { profile } from "@/content/profile";
import { GamesShelf } from "./games/games-shelf";
import { LazyGlobe } from "./globe/lazy-globe";
import { MusicBoard } from "./music/music-board";
import { PlaceCounters } from "./place-counters";
import { SectionShell } from "./section-shell";

const ICON_SIZE_IN_PIXELS = 20;
const ICON_STROKE_WIDTH = 1.8;
const INTRO_LINK_CLASS =
  "font-medium text-accent no-underline underline-offset-4 hover:text-accent-hi hover:underline";

function IntroLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={INTRO_LINK_CLASS}>
      {children}
    </a>
  );
}

/** The Places, Games and Music sections of the home page, each wrapped in a `SectionShell`. */
const PROFILE_CHIP_CLASS =
  "chip-link flex min-h-11 items-center gap-2 rounded-pill border border-line-strong px-5 text-small text-text no-underline";

export async function PlacesSection() {
  const t = await getTranslations("Sections.places");
  const locale = await getLocale();
  const globePlaces = buildGlobePlaces(places, tripPhotos, locale === "pt" ? "pt" : "en");
  const counters = countPlaces(globePlaces);
  const profileChips = [
    { key: "unsplash", label: "Unsplash", href: profile.links.unsplash.href },
    { key: "pexels", label: "Pexels", href: profile.links.pexels.href },
  ];
  return (
    <SectionShell
      id="places"
      icon={<MapPin size={ICON_SIZE_IN_PIXELS} strokeWidth={ICON_STROKE_WIDTH} />}
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
              <a
                key={chip.key}
                href={chip.href}
                target="_blank"
                rel="noopener noreferrer"
                className={PROFILE_CHIP_CLASS}
              >
                {chip.label}
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="nudge-arrow"
                />
              </a>
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

export async function GamesSection() {
  const t = await getTranslations("Sections.games");
  const locale = await getLocale();
  const shelfEntries = buildShelfEntries(games, gameCovers, locale === "pt" ? "pt" : "en");
  return (
    <SectionShell
      id="games"
      icon={<Gamepad2 size={ICON_SIZE_IN_PIXELS} strokeWidth={ICON_STROKE_WIDTH} />}
      eyebrow={t("eyebrow")}
      title={t("title")}
      intro={t("intro")}
    >
      <GamesShelf
        games={shelfEntries}
        labels={{
          tabsLabel: t("shelf.tabsLabel"),
          platformsLabel: t("shelf.platformsLabel"),
          all: t("shelf.all"),
          tabs: {
            playing: t("shelf.tabs.playing"),
            played: t("shelf.tabs.played"),
            wishlist: t("shelf.tabs.wishlist"),
            recommended: t("shelf.tabs.recommended"),
          },
          status: {
            playing: t("shelf.status.playing"),
            played: t("shelf.status.played"),
            wishlist: t("shelf.status.wishlist"),
            recommended: t("shelf.status.recommended"),
          },
          reaction: {
            playing: t("shelf.reaction.playing"),
            played: t("shelf.reaction.played"),
            wishlist: t("shelf.reaction.wishlist"),
            recommended: t("shelf.reaction.recommended"),
          },
          reactionError: t("shelf.reactionError"),
          voteRateLimited: t("shelf.voteRateLimited"),
          reactionPressedRecommended: t("shelf.reactionPressedRecommended"),
          sticker: t.raw("shelf.sticker"),
          pendingSticker: t("shelf.pendingSticker"),
          pendingNote: t("shelf.pendingNote"),
          rating: t.raw("shelf.rating"),
          stageLabel: t("shelf.stageLabel"),
          previous: t("shelf.previous"),
          next: t("shelf.next"),
          showGame: t.raw("shelf.showGame"),
          counterHint: t("shelf.counterHint"),
          soon: t("shelf.soon"),
          emptyRecommendedTitle: t("shelf.emptyRecommendedTitle"),
          emptyRecommendedNote: t("shelf.emptyRecommendedNote"),
          emptyTitle: t("shelf.emptyTitle"),
          emptyNote: t("shelf.emptyNote"),
          recommendLike: t("shelf.recommendLike"),
          form: {
            title: t("form.title"),
            subtitle: t("form.subtitle"),
            searchLabel: t("form.searchLabel"),
            searchPlaceholder: t("form.searchPlaceholder"),
            resultsLabel: t("form.resultsLabel"),
            searching: t("form.searching"),
            noResults: t("form.noResults"),
            searchError: t("form.searchError"),
            credit: t("form.credit"),
            chooseAnother: t("form.chooseAnother"),
            honeypotLabel: t("form.honeypotLabel"),
            submit: t.raw("form.submit"),
            submitting: t("form.submitting"),
            doneApproved: t.raw("form.doneApproved"),
            donePending: t.raw("form.donePending"),
            rateLimited: t("form.rateLimited"),
            failed: t("form.failed"),
            seeAll: t.raw("form.seeAll"),
          },
        }}
      />
    </SectionShell>
  );
}

export async function MusicSection() {
  const t = await getTranslations("Sections.music");
  const locale = await getLocale();
  const { songOfTheMoment, pastTracks } = buildMusicBoard(music, musicPreviews);

  return (
    <SectionShell
      id="music"
      icon={<Music size={ICON_SIZE_IN_PIXELS} strokeWidth={ICON_STROKE_WIDTH} />}
      eyebrow={t("eyebrow")}
      title={t("title")}
      intro={t("intro")}
    >
      <MusicBoard
        locale={locale}
        songOfTheMoment={songOfTheMoment}
        pastTracks={pastTracks}
        labels={{
          songOfTheMoment: t("songOfTheMoment"),
          record: t("record"),
          play: t("play"),
          pause: t("pause"),
          previewUnavailable: t("previewUnavailable"),
          hint: t("hint"),
          listenOn: t("listenOn"),
          youtubeMusic: t("youtubeMusic"),
          spotify: t("spotify"),
          appleMusic: t("appleMusic"),
          credit: t("credit"),
          previously: t("previously"),
          onTheTurntable: t("onTheTurntable"),
          previewTrack: t.raw("previewTrack"),
          pauseTrack: t.raw("pauseTrack"),
        }}
      />
    </SectionShell>
  );
}
