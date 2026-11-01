import { ArrowUpRight, Briefcase, Camera, GitBranch, Mail, type LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { isPlaceholder, profile } from "@/content/profile";
import { ExternalLink } from "@/shared/components/external-link";

const chipClassName =
  "chip-link flex min-h-12 items-center gap-2.5 rounded-pill border border-line-strong bg-glass-chip px-5 no-underline";

function ChipContent({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <>
      <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
      <span>{label}</span>
      <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" className="nudge-arrow" />
    </>
  );
}

export async function Footer() {
  const t = await getTranslations("Footer");
  const { links } = profile;
  const emailAddress = links.email.address;
  const emailHref = isPlaceholder(emailAddress) ? "#top" : `mailto:${emailAddress}`;

  const profileChips = [
    { key: "github", icon: GitBranch, label: t("github"), href: links.github.href },
    { key: "linkedin", icon: Briefcase, label: t("linkedin"), href: links.linkedin.href },
    { key: "instagram", icon: Camera, label: t("instagram"), href: links.instagram.href },
  ] as const;

  return (
    <footer className="relative isolate overflow-hidden border-t border-line">
      <div
        aria-hidden="true"
        className="floodlight drift-2 bottom-[-260px] left-[-160px] size-[520px] bg-[radial-gradient(circle,var(--glow-footer-orange),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="floodlight drift-1 right-[-140px] bottom-[-240px] size-[460px] bg-[radial-gradient(circle,var(--glow-footer-sand),transparent_65%)]"
      />

      <div className="mx-auto flex max-w-page flex-col gap-12 px-8 pt-[72px] pb-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="reveal m-0 pb-[0.06em] font-display text-[clamp(48px,10vw,152px)] leading-[0.9] font-extrabold tracking-[-0.045em] text-text">
            {t.rich("headline", {
              accent: (accentWord) => <em className="text-accent not-italic">{accentWord}</em>,
            })}
          </h2>
          <nav aria-label={t("navigationLabel")} className="flex flex-wrap gap-3">
            {profileChips.map(({ key, icon, label, href }) => (
              <ExternalLink key={key} href={href} className={chipClassName}>
                <ChipContent icon={icon} label={label} />
              </ExternalLink>
            ))}
            <a
              href={emailHref}
              className="chip-link pill-primary flex min-h-12 items-center gap-2.5 border border-transparent px-5"
            >
              <ChipContent icon={Mail} label={emailAddress} />
            </a>
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-line pt-6 text-small text-text-muted">
          <span className="font-mono text-eyebrow">{t("copyright")}</span>
        </div>
      </div>
    </footer>
  );
}
