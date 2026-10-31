import { Gamepad2 } from "lucide-react";
import Image from "next/image";
import { getCasePose } from "@/lib/games/coverflow";
import { PLATFORM_STYLES } from "./platform-style";
import type { CaseEntry } from "./types";

const WATERMARK_SIZE_IN_PIXELS = 170;
const WATERMARK_STROKE_WIDTH = 1.3;

type GameCaseProps = {
  /** Null renders the dashed empty case. */
  entry: CaseEntry | null;
  index: number;
  activeIndex: number;
  /** Replaces the year in the band badge, e.g. "SOON" on the wishlist. */
  badgeText: string;
  /** Title shown on an empty case. */
  emptyTitle: string;
  showLabel: string;
  onSelect: (index: number) => void;
};

export function GameCase({
  entry,
  index,
  activeIndex,
  badgeText,
  emptyTitle,
  showLabel,
  onSelect,
}: GameCaseProps) {
  const pose = getCasePose(index, activeIndex);
  const isActive = index === activeIndex;
  const title = entry?.title ?? emptyTitle;
  const platformStyle = entry ? PLATFORM_STYLES[entry.platform] : undefined;

  return (
    <div
      className="game-case"
      style={{
        transform: `translateX(${pose.translateX}px) translateZ(${pose.translateZ}px) rotateY(${pose.rotateY}deg)`,
        zIndex: pose.zIndex,
        opacity: pose.opacity,
        pointerEvents: pose.interactive ? undefined : "none",
      }}
    >
      <div className="game-case-back absolute inset-0 rounded-xs bg-bg-sunken" />
      <div className="game-case-spine absolute top-0 h-[252px]">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 font-mono text-[8px] tracking-[1px] whitespace-nowrap text-text-muted">
          {title}
        </span>
      </div>
      <div
        className={`game-case-front absolute inset-0 overflow-hidden rounded-xs ${entry ? "" : "game-case-empty"}`}
        style={
          entry
            ? { background: `linear-gradient(160deg, ${entry.tone} 0%, var(--bg) 120%)` }
            : undefined
        }
      >
        <div
          className={`flex h-7 items-center justify-between px-2.5 font-mono text-[10px] font-medium tracking-[1px] ${entry ? `band-${entry.platform}` : "band-empty"}`}
        >
          <span>{platformStyle?.bandText}</span>
          {entry ? <span>{badgeText}</span> : null}
        </div>
        <Gamepad2
          aria-hidden="true"
          size={WATERMARK_SIZE_IN_PIXELS}
          strokeWidth={WATERMARK_STROKE_WIDTH}
          className="absolute top-[52px] -right-6 text-white/10"
        />
        {entry?.coverUrl ? (
          <span className="absolute inset-x-0 top-7 bottom-0">
            <Image
              src={entry.coverUrl}
              alt=""
              fill
              unoptimized
              draggable={false}
              sizes="200px"
              className="object-cover"
            />
          </span>
        ) : null}
        <div className="absolute right-3.5 bottom-3.5 left-3.5 flex flex-col gap-1.5">
          {entry?.sticker ? (
            <span className="-rotate-3 self-start rounded-pill bg-text px-2 py-[3px] font-mono text-[9px] text-on-accent">
              {entry.sticker}
            </span>
          ) : null}
          {entry?.coverUrl ? null : (
            <span className="game-title font-display text-[26px] leading-[0.95] font-extrabold tracking-[-0.02em] text-white">
              {title}
            </span>
          )}
        </div>
        <div className="game-case-gloss pointer-events-none absolute inset-0" />
        {entry && pose.interactive ? (
          <button
            type="button"
            aria-label={showLabel}
            aria-pressed={isActive}
            tabIndex={pose.interactive ? 0 : -1}
            onClick={() => onSelect(index)}
            className="absolute inset-0 cursor-pointer border-0 bg-transparent p-0"
          />
        ) : null}
      </div>
    </div>
  );
}
