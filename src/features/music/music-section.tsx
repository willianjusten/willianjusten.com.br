import { Music } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { music } from "@/content/music";
import { musicPreviews } from "@/content/music-previews";
import { SectionShell } from "@/components/section-shell";
import { MusicBoard } from "./components/music-board";
import { buildMusicBoard } from "./lib/music-board";

export async function MusicSection() {
  const t = await getTranslations("Sections.music");
  const locale = await getLocale();
  const { songOfTheMoment, pastTracks } = buildMusicBoard(music, musicPreviews);

  return (
    <SectionShell
      id="music"
      icon={Music}
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
