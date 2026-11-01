import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { profile } from "@/content/profile";
import { COURTSIDE_URL } from "@/lib/site";
import { SectionShell } from "./section-shell";
import { ShotGameLoader } from "./shot-game-loader";

const ICON_SIZE_IN_PIXELS = 20;
const ICON_STROKE_WIDTH = 1.8;

function BasketballIcon({ size = ICON_SIZE_IN_PIXELS }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={ICON_STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v20M2 12h20M4.9 4.9c3.1 3.1 3.1 11.1 0 14.2M19.1 4.9c-3.1 3.1-3.1 11.1 0 14.2" />
    </svg>
  );
}

export async function NbaSection() {
  const t = await getTranslations("Sections.nba");
  const tags = t.raw("tags") as string[];
  const names = profile.nba.builtWith.join(t("and"));
  const gameLabels = {
    title: t("game.title"),
    hint: t("game.hint"),
    onFireHint: t("game.onFireHint"),
    you: t("game.you"),
    streak: t("game.streak"),
    best: t("game.best"),
    allVisitors: t("game.allVisitors"),
    canvasDescription: t("game.canvasDescription"),
    firstTimeHint: t("game.firstTimeHint"),
    keyboardAim: t("game.keyboardAim", { angle: "{angle}" }),
    swish: t("game.swish"),
    bucket: t("game.bucket"),
    onFire: t("game.onFire"),
  };

  return (
    <SectionShell
      id="nba"
      icon={<BasketballIcon />}
      badgeClassName="bounce-ball"
      eyebrow={t("eyebrow")}
      title={t("title")}
      intro={t("intro")}
      aside={<ShotGameLoader labels={gameLabels} />}
    >
      <ul className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-pill border border-line-strong px-3 py-1.5 font-mono text-overline text-text-2"
          >
            {tag}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <a
          href={COURTSIDE_URL}
          className="group inline-flex min-h-12 items-center gap-2 rounded-pill bg-(image:--ball-light) px-6 font-semibold text-on-accent no-underline hover:text-on-accent"
        >
          <BasketballIcon size={18} />
          {t("open")}
          <ArrowUpRight
            aria-hidden="true"
            size={16}
            className="transition-transform duration-250 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
          />
        </a>
        <span className="text-small text-text-muted">{t("builtWith", { names })}</span>
      </div>
    </SectionShell>
  );
}
