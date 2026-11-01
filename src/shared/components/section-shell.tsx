import type { ComponentType, ReactNode } from "react";

const ICON_SIZE_IN_PIXELS = 20;
const ICON_STROKE_WIDTH = 1.8;

export type SectionIcon = ComponentType<{ size?: number; strokeWidth?: number }>;

type SectionShellProps = {
  id: string;
  icon: SectionIcon;
  eyebrow: string;
  title: string;
  intro: ReactNode;
  badgeClassName?: string;
  children?: ReactNode;
  /** Optional right-hand column; the header and children then sit in a left column beside it. */
  aside?: ReactNode;
  /** Optional block beside the header only, bottom-aligned, that wraps below it on narrow screens. */
  headerAside?: ReactNode;
};

export function SectionShell({
  id,
  icon: Icon,
  eyebrow,
  title,
  intro,
  badgeClassName = "",
  children,
  aside,
  headerAside,
}: SectionShellProps) {
  const headingId = `${id}-heading`;

  const headerContent = (
    <>
      <p className="mb-4 flex items-center gap-3.5 font-mono text-eyebrow text-accent">
        <span
          aria-hidden="true"
          className={`wiggle flex size-10 items-center justify-center rounded-md bg-(image:--ball-light) text-on-accent shadow-(--badge-glow) ${badgeClassName}`}
        >
          <Icon size={ICON_SIZE_IN_PIXELS} strokeWidth={ICON_STROKE_WIDTH} />
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
    </>
  );
  const header = headerAside ? (
    <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
      <div className="min-w-0">{headerContent}</div>
      {headerAside}
    </div>
  ) : (
    headerContent
  );

  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-line">
      <div className="mx-auto max-w-page px-8 py-24">
        {aside ? (
          <div className="flex flex-wrap gap-x-16 gap-y-12">
            <div className="flex min-w-0 flex-[1_1_340px] flex-col">
              {header}
              {children}
            </div>
            {aside}
          </div>
        ) : (
          <>
            {header}
            {children}
          </>
        )}
      </div>
    </section>
  );
}
