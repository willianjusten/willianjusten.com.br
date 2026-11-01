import { ArrowUpRight, type LucideIcon } from "lucide-react";
import { ExternalLink } from "@/shared/components/external-link";

type StatusTileProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  value: string;
  sub: string;
  isExternal?: boolean;
};

export function StatusTile({ href, icon: Icon, label, value, sub, isExternal }: StatusTileProps) {
  const Anchor = isExternal ? ExternalLink : "a";
  return (
    <Anchor
      href={href}
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
    </Anchor>
  );
}
