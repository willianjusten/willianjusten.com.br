import { Code, Gamepad2, Music, Plane } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { CSSProperties } from "react";
import { currentlyPlaying, games } from "@/content/games";
import { music } from "@/content/music";
import { profile } from "@/content/profile";
import { PLATFORM_STYLES } from "@/sections/games/lib/platforms";
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

export async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("Hero");
  const { now } = profile;
  const playing = currentlyPlaying(games);
  const songOfTheMoment = music.tracks.find((track) => track.id === music.songOfTheMoment)!;

  return (
    <section id="top" className="relative isolate">
      <HeroSpotlight />
      <div
        aria-hidden="true"
        className="floodlight drift-1 top-[-120px] left-[48%] size-[520px] bg-[radial-gradient(circle,var(--glow-orange),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="floodlight drift-2 top-[120px] left-[68%] size-[460px] bg-[radial-gradient(circle,var(--glow-amber),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="floodlight drift-3 top-[260px] left-[30%] size-[420px] bg-[radial-gradient(circle,var(--glow-sand),transparent_65%)]"
      />

      <div className="mx-auto max-w-page px-8 pt-[136px] pb-[72px]">
        <p className="fade-in mb-7 flex items-center gap-2.5 font-mono text-eyebrow text-text-muted">
          <span
            className="pulse-dot inline-block size-2 rounded-full bg-accent"
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

        <p className="fade-in mt-9 mb-0 max-w-[640px] text-lead leading-[1.45] text-text-2">
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
