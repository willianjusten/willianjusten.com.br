import { ArrowUpRight, type LucideIcon } from "lucide-react";

type StatusTileProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  /** Opens in a new tab with a safe rel, for off-site profiles. */
  isExternal?: boolean;
};

export function StatusTile({ href, icon: Icon, label, value, sub, isExternal }: StatusTileProps) {
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="status-tile reveal flex min-h-11 flex-col gap-3.5 rounded-lg border border-line-strong bg-(--glass) p-5 no-underline backdrop-blur-[10px]"
    >
      <span className="flex items-center justify-between">
        <span className="tile-icon flex size-10 items-center justify-center rounded-md bg-(--icon-well) text-accent">
          <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <ArrowUpRight
          size={18}
          strokeWidth={1.8}
          aria-hidden="true"
          className="nudge-arrow text-text-muted"
        />
      </span>
      <span className="flex flex-col gap-1">
        <span className="font-mono text-overline tracking-[0.08em] text-text-muted uppercase">
          {label}
        </span>
        <span className="text-lg font-semibold text-text">{value}</span>
        <span className="text-small text-text-muted">{sub}</span>
      </span>
    </a>
  );
}
