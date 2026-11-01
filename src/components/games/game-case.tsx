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

  const shadeSide = pose.rotateY < 0 ? "right" : "left";

  return (
    <div
      className={`game-case overflow-hidden rounded-xs ${entry ? "" : "game-case-empty"}`}
      style={{
        transform: `translateX(${pose.translateX}px) translateZ(${pose.translateZ}px) rotateY(${pose.rotateY}deg)`,
        zIndex: pose.zIndex,
        opacity: pose.opacity,
        // Hidden cases leave the compositor too, not just fade out.
        visibility: pose.interactive ? undefined : "hidden",
        pointerEvents: pose.interactive ? undefined : "none",
        background: entry ? `linear-gradient(160deg, ${entry.tone} 0%, var(--bg) 120%)` : undefined,
      }}
    >
      <div
        className={`flex h-7 items-center justify-between px-2.5 font-mono text-micro font-medium tracking-[1px] ${entry ? `band-${entry.platform}` : "band-empty"}`}
      >
        <span>{platformStyle?.bandText}</span>
        {entry ? <span>{badgeText}</span> : null}
      </div>
      {entry?.coverUrl ? (
        <span className="absolute inset-x-0 top-7 bottom-0">
          <Image
            src={entry.coverUrl}
            alt=""
            fill
            draggable={false}
            sizes="200px"
            className="object-cover"
          />
        </span>
      ) : (
        <Gamepad2
          aria-hidden="true"
          size={WATERMARK_SIZE_IN_PIXELS}
          strokeWidth={WATERMARK_STROKE_WIDTH}
          className="absolute top-[52px] -right-6 text-white/10"
        />
      )}
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
      {isActive ? null : (
        <div
          aria-hidden="true"
          className={`game-case-shade game-case-shade-${shadeSide} pointer-events-none absolute inset-0`}
        />
      )}
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
  );
}
