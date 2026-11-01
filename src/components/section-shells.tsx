import { Gamepad2, MapPin, Music } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { games } from "@/content/games";
import { music } from "@/content/music";
import { buildMusicBoard } from "@/content/music-board";
import { musicPreviews } from "@/content/music-previews";
import { places } from "@/content/places";
import { GamesShelf } from "./games/games-shelf";
import { LazyGlobe } from "./globe/lazy-globe";
import { MusicBoard } from "./music/music-board";
import { SectionShell } from "./section-shell";

const ICON_SIZE_IN_PIXELS = 20;
const ICON_STROKE_WIDTH = 1.8;

/** The four empty section shells. Later tickets fill each one through its `children`. */
export async function PlacesSection() {
  const t = await getTranslations("Sections.places");
  return (
    <SectionShell
      id="places"
      icon={<MapPin size={ICON_SIZE_IN_PIXELS} strokeWidth={ICON_STROKE_WIDTH} />}
      eyebrow={t("eyebrow")}
      title={t("title")}
      intro={t("intro")}
    >
      <div className="mt-10">
        <LazyGlobe
          places={places.map(({ slug, name, country, lat, lon, isHome, color }) => ({
            slug,
            name,
            country,
            lat,
            lon,
            isHome,
            color,
          }))}
          labels={{
            description: t("globe.description"),
            zoomIn: t("globe.zoomIn"),
            zoomOut: t("globe.zoomOut"),
            reset: t("globe.reset"),
            hint: t("globe.hint"),
            clusterOf: t("globe.clusterOf"),
          }}
        />
      </div>
    </SectionShell>
  );
}

export async function GamesSection() {
  const t = await getTranslations("Sections.games");
  const locale = await getLocale();
  const shelfEntries = games.map(({ slug, title, platform, list, year, note, tone }) => ({
    slug,
    title,
    platform,
    list,
    year,
    note: note[locale === "pt" ? "pt" : "en"],
    tone,
  }));
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
          setup: t("shelf.setup"),
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
          previewTrack: t.raw("previewTrack"),
          pauseTrack: t.raw("pauseTrack"),
        }}
      />
    </SectionShell>
  );
}
