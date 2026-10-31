import type { ReactNode } from "react";

type SectionShellProps = {
  /** Anchor id, targeted by the header navigation. */
  id: string;
  icon: ReactNode;
  eyebrow: string;
  title: string;
  intro: string;
  /** Extra classes on the icon badge, e.g. the NBA ball bounce. */
  badgeClassName?: string;
  /** Section body, filled in by the section tickets. */
  children?: ReactNode;
};

export function SectionShell({
  id,
  icon,
  eyebrow,
  title,
  intro,
  badgeClassName = "",
  children,
}: SectionShellProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-line">
      <div className="mx-auto max-w-page px-8 py-24">
        <p className="mb-4 flex items-center gap-3.5 font-mono text-eyebrow text-accent">
          <span
            aria-hidden="true"
            className={`wiggle flex size-10 items-center justify-center rounded-md bg-(image:--ball-light) text-on-accent shadow-(--badge-glow) ${badgeClassName}`}
          >
            {icon}
          </span>
          {eyebrow}
        </p>
        <h2
          id={headingId}
          className="reveal m-0 font-display text-h2 leading-[1.02] font-bold tracking-[-0.025em]"
        >
          {title}
        </h2>
        <p className="mt-4 mb-0 max-w-[560px] text-body-lg text-text-2">{intro}</p>
        {children}
      </div>
    </section>
  );
}
