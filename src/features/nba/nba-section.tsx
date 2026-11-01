import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { profile } from "@/content/profile";
import { COURTSIDE_URL } from "@/lib/site";
import { ExternalLink } from "@/components/external-link";
import { SectionShell } from "@/components/section-shell";
import { BasketballIcon } from "./components/basketball-icon";
import { ShotGameLoader } from "./components/shot-game-loader";

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
    allVisitorsDetail: t("game.allVisitorsDetail", { percent: "{percent}" }),
    canvasDescription: t("game.canvasDescription"),
    keyboardAim: t("game.keyboardAim", { angle: "{angle}" }),
    swish: t("game.swish"),
    bucket: t("game.bucket"),
    onFire: t("game.onFire"),
  };

  return (
    <SectionShell
      id="nba"
      icon={BasketballIcon}
      badgeClassName="motion-safe:animate-bounce-ball"
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
        <ExternalLink
          href={COURTSIDE_URL}
          className="group inline-flex min-h-12 items-center gap-2 pill-primary px-6 hover:text-on-accent"
        >
          <BasketballIcon size={18} />
          {t("open")}
          <ArrowUpRight
            aria-hidden="true"
            size={16}
            className="transition-transform duration-250 group-hover:translate-x-0.75 group-hover:-translate-y-0.75"
          />
        </ExternalLink>
        <span className="text-small text-text-muted">{t("builtWith", { names })}</span>
      </div>
    </SectionShell>
  );
}
