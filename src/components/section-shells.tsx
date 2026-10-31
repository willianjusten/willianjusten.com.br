import { Gamepad2, MapPin, Music } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SectionShell } from "./section-shell";

const ICON_SIZE_IN_PIXELS = 20;
const ICON_STROKE_WIDTH = 1.8;

function BasketballIcon() {
  return (
    <svg
      width={ICON_SIZE_IN_PIXELS}
      height={ICON_SIZE_IN_PIXELS}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={ICON_STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v20M2 12h20M5.6 5.6a10 10 0 0 1 0 12.8M18.4 5.6a10 10 0 0 0 0 12.8" />
    </svg>
  );
}

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

export async function NbaSection() {
  const t = await getTranslations("Sections.nba");
  return (
    <SectionShell
      id="nba"
      icon={<BasketballIcon />}
      badgeClassName="bounce-ball"
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
