import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Floodlight } from "@/components/floodlight";
import { HeaderFrame } from "@/components/layout/header/header-frame";
import { LocaleToggle } from "@/components/layout/header/locale-toggle";
import { Link } from "@/i18n/navigation";
import { BreakableNumber } from "./components/breakable-number";

export async function NotFoundSection() {
  const t = await getTranslations("NotFound");

  return (
    <>
      <HeaderFrame>
        <Link
          href="/"
          aria-label={t("homeLogo")}
          className="inline-flex min-h-10 min-w-10 items-center justify-start no-underline sm:min-h-11 sm:min-w-11 sm:justify-center"
        >
          <span className="wiggle flex size-8 items-center justify-center rounded-sm bg-(image:--ball-light) font-display text-ui font-extrabold text-on-accent sm:size-9 sm:text-logo">
            wj
          </span>
        </Link>
        <div className="ml-auto">
          <LocaleToggle />
        </div>
      </HeaderFrame>

      <main id="main" className="relative isolate">
        <Floodlight className="-top-30 left-[40%] size-130 bg-[radial-gradient(circle,var(--glow-orange),transparent_65%)] motion-safe:animate-drift-1" />
        <Floodlight className="top-50 left-[64%] size-115 bg-[radial-gradient(circle,var(--glow-amber),transparent_65%)] motion-safe:animate-drift-2" />

        <div className="mx-auto flex min-h-screen max-w-page flex-col justify-center gap-8 px-8 pt-28 pb-12">
          <p className="m-0 flex items-center gap-2.5 font-mono text-eyebrow text-text-muted motion-safe:animate-fade-in">
            <span
              className="relative inline-block size-2 rounded-full bg-accent after:absolute after:inset-0 after:rounded-full after:bg-accent/50 after:opacity-0 motion-safe:after:animate-pulse-ring"
              aria-hidden="true"
            />
            {t("eyebrow")}
          </p>

          <BreakableNumber
            labels={{
              canvasDescription: t("canvasDescription"),
              hint: t("hint"),
              touchHint: t("touchHint"),
              damage: t("damage"),
              broken: t("broken"),
              rebuild: t("rebuild"),
            }}
          />

          <div className="flex flex-wrap items-end justify-between gap-8 border-t border-line pt-8">
            <div className="max-w-lead">
              <h1 className="m-0 font-display text-h2 leading-[1] font-extrabold tracking-[-0.03em]">
                {t("title")}
              </h1>
              <p className="mt-4 mb-0 text-body-lg leading-[1.5] text-text-2">{t("lead")}</p>
            </div>
            <Link
              href="/"
              className="chip-link pill-primary flex min-h-12 items-center gap-2.5 px-6"
            >
              <ArrowLeft size={18} strokeWidth={1.8} aria-hidden="true" />
              {t("home")}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
