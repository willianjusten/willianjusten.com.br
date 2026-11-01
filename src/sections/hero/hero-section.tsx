import { Code, Gamepad2, Music, Plane } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import { currentlyPlaying, games } from "@/content/games";
import { music } from "@/content/music";
import { profile } from "@/content/profile";
import { PLATFORM_STYLES } from "@/sections/games/lib/platforms";
import { findSongOfTheMoment } from "@/sections/music/lib/music-board";
import { Floodlight } from "@/shared/components/floodlight";
import { HeroSpotlight } from "./components/hero-spotlight";
import { LocalTime } from "./components/local-time";
import { StatusTile } from "./components/status-tile";

const FIRST_NAME = "Willian";
const LAST_NAME = "JUSTEN";
const LETTER_RISE_START_IN_SECONDS = 0.1;
const LETTER_RISE_STEP_IN_SECONDS = 0.045;
const FLIP_START_IN_SECONDS = 0.45;
const FLIP_STEP_IN_SECONDS = 0.08;

function secondsAfter(start: number, step: number, index: number): string {
  return `${(start + step * index).toFixed(3)}s`;
}

export async function HeroSection() {
  const locale = await getLocale();
  const t = await getTranslations("Hero");
  const { now } = profile;
  const playing = currentlyPlaying(games);
  const songOfTheMoment = findSongOfTheMoment(music.tracks, music.songOfTheMoment);

  return (
    <section id="top" className="relative isolate">
      <HeroSpotlight />
      <Floodlight className="-top-30 left-[48%] size-130 bg-[radial-gradient(circle,var(--glow-orange),transparent_65%)] motion-safe:animate-drift-1" />
      <Floodlight className="top-30 left-[68%] size-115 bg-[radial-gradient(circle,var(--glow-amber),transparent_65%)] motion-safe:animate-drift-2" />
      <Floodlight className="top-65 left-[30%] size-105 bg-[radial-gradient(circle,var(--glow-sand),transparent_65%)] motion-safe:animate-drift-3" />

      <div className="mx-auto max-w-page px-8 pt-[136px] pb-[72px]">
        <p className="mb-7 motion-safe:animate-fade-in flex items-center gap-2.5 font-mono text-eyebrow text-text-muted">
          <span
            className="relative inline-block size-2 rounded-full bg-accent after:absolute after:inset-0 after:rounded-full after:bg-accent/50 after:opacity-0 motion-safe:after:animate-pulse-ring"
            aria-hidden="true"
          />
          <span>{t.rich("clock", { time: () => <LocalTime /> })}</span>
        </p>

        <h1 className="m-0 font-display text-display leading-[0.88] font-extrabold tracking-[-0.04em]">
          <span className="sr-only">{t("name")}</span>
          <span aria-hidden="true" className="block">
            {[...FIRST_NAME].map((letter, index) => (
              <span
                key={index}
                className="letter-rise"
                style={{
                  animationDelay: secondsAfter(
                    LETTER_RISE_START_IN_SECONDS,
                    LETTER_RISE_STEP_IN_SECONDS,
                    index,
                  ),
                }}
              >
                <span className="letter-hover">{letter}</span>
              </span>
            ))}
          </span>
          <span aria-hidden="true" className="mt-[0.1em] flex gap-[0.05em] perspective-[600px]">
            {[...LAST_NAME].map((letter, index) => (
              <span
                key={index}
                className="flip-in"
                style={
                  {
                    "--flip-delay": secondsAfter(
                      FLIP_START_IN_SECONDS,
                      FLIP_STEP_IN_SECONDS,
                      index,
                    ),
                  } as CSSProperties
                }
              >
                <span className="flip-tile">{letter}</span>
              </span>
            ))}
          </span>
        </h1>

        <p className="mt-9 motion-safe:animate-fade-in mb-0 max-w-[640px] text-lead leading-[1.45] text-text-2">
          {t.rich("lead", {
            strong: (spokeName) => <strong className="font-semibold text-text">{spokeName}</strong>,
          })}
        </p>

        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-4">
          <StatusTile
            href={now.building.link}
            isExternal
            icon={Code}
            label={t("building.label")}
            value={t("building.value", { company: now.building.company })}
            sub={t("building.sub")}
          />
          <StatusTile
            href="#games"
            icon={Gamepad2}
            label={t("playing.label")}
            value={playing.title}
            sub={PLATFORM_STYLES[playing.platform].name}
          />
          <StatusTile
            href="#music"
            icon={Music}
            label={t("onRepeat.label")}
            value={songOfTheMoment.title}
            sub={songOfTheMoment.artist}
          />
          <StatusTile
            href="#places"
            icon={Plane}
            label={t("lastSeen.label")}
            value={now.lastSeen.place}
            sub={now.lastSeen.when[locale]}
          />
        </div>
      </div>
    </section>
  );
}
