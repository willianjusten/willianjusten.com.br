import { Gamepad2, MapPin, Music } from "lucide-react";
import { getTranslations } from "next-intl/server";
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
    />
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
  return (
    <SectionShell
      id="music"
      icon={<Music size={ICON_SIZE_IN_PIXELS} strokeWidth={ICON_STROKE_WIDTH} />}
      eyebrow={t("eyebrow")}
      title={t("title")}
      intro={t("intro")}
    />
  );
}
