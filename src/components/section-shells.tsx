import { Gamepad2, MapPin, Music } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { music } from "@/content/music";
import { buildMusicBoard } from "@/content/music-board";
import { musicPreviews } from "@/content/music-previews";
import { places } from "@/content/places";
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
  return (
    <SectionShell
      id="games"
      icon={<Gamepad2 size={ICON_SIZE_IN_PIXELS} strokeWidth={ICON_STROKE_WIDTH} />}
      eyebrow={t("eyebrow")}
      title={t("title")}
      intro={t("intro")}
    />
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
