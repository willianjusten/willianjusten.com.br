import { Gamepad2 } from "lucide-react";
import Image from "next/image";
import { memo, type CSSProperties, type ReactNode } from "react";
import { getCasePose, type CasePose } from "../lib/coverflow";
import { EMPTY_BAND_CLASS, PLATFORM_STYLES } from "../lib/platforms";
import type { CaseEntry } from "../lib/shelf-cases";

const WATERMARK_SIZE_IN_PIXELS = 170;
const WATERMARK_STROKE_WIDTH = 1.3;
const BAND_CLASS =
  "flex h-7 items-center justify-between px-2.5 font-mono text-micro font-medium tracking-[1px]";
const TITLE_CLASS =
  "font-display text-[26px] leading-[0.95] font-extrabold tracking-[-0.02em] text-white text-shadow-[0_2px_12px_rgb(0_0_0/40%)]";
// Darkens the edge turned away from the viewer on side cases.
const SHADE_CLASS = {
  left: "bg-linear-to-l/srgb from-transparent to-black/55",
  right: "bg-linear-to-r/srgb from-transparent to-black/55",
};

type CaseFrameProps = {
  pose: CasePose;
  isActive: boolean;
  title: string;
  frontClassName?: string;
  frontStyle?: CSSProperties;
  children: ReactNode;
};

function CaseFrame({
  pose,
  isActive,
  title,
  frontClassName = "",
  frontStyle,
  children,
}: CaseFrameProps) {
  const shadeSide = pose.rotateY < 0 ? "right" : "left";

  return (
    <div
      className="game-case"
      style={{
        transform: `translateX(${pose.translateX}px) translateZ(${pose.translateZ}px) rotateY(${pose.rotateY}deg)`,
        zIndex: pose.zIndex,
        opacity: pose.opacity,
        // Hidden cases leave the compositor too, not just fade out.
        visibility: pose.interactive ? undefined : "hidden",
        pointerEvents: pose.interactive ? undefined : "none",
      }}
    >
      <div className="game-case-back absolute inset-0 rounded-xs bg-bg-sunken" />
      <div className="game-case-spine absolute top-0 h-(--game-case-height)">
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 font-mono text-[8px] tracking-[1px] whitespace-nowrap text-text-muted">
          {title}
        </span>
      </div>
      <div
        className={`game-case-front absolute inset-0 overflow-hidden rounded-xs inset-ring inset-ring-white/12 ${frontClassName}`}
        style={frontStyle}
      >
        {children}
        <div className="game-case-gloss pointer-events-none absolute inset-0" />
        {isActive ? null : (
          <div
            aria-hidden="true"
            className={`game-case-shade pointer-events-none absolute inset-0 ${SHADE_CLASS[shadeSide]}`}
          />
        )}
      </div>
    </div>
  );
}

function Watermark() {
  return (
    <Gamepad2
      aria-hidden="true"
      size={WATERMARK_SIZE_IN_PIXELS}
      strokeWidth={WATERMARK_STROKE_WIDTH}
      className="absolute top-[52px] -right-6 text-white/10"
    />
  );
}

type GameCaseProps = {
  entry: CaseEntry;
  index: number;
  activeIndex: number;
  /** Replaces the year in the band badge, e.g. "SOON" on the wishlist. */
  badgeText: string;
  showLabel: string;
  onSelect: (index: number) => void;
};

export const GameCase = memo(function GameCase({
  entry,
  index,
  activeIndex,
  badgeText,
  showLabel,
  onSelect,
}: GameCaseProps) {
  const pose = getCasePose(index, activeIndex);
  const isActive = index === activeIndex;
  const platformStyle = PLATFORM_STYLES[entry.platform];

  return (
    <CaseFrame
      pose={pose}
      isActive={isActive}
      title={entry.title}
      frontStyle={{ background: `linear-gradient(160deg, ${entry.tone} 0%, var(--bg) 120%)` }}
    >
      <div className={`${BAND_CLASS} ${platformStyle.bandClass}`}>
        <span>{platformStyle.bandText}</span>
        <span>{badgeText}</span>
      </div>
      {entry.coverUrl ? (
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
        <Watermark />
      )}
      <div className="absolute inset-x-3.5 bottom-3.5 flex flex-col gap-1.5">
        {entry.sticker ? (
          <span className="-rotate-3 self-start rounded-pill bg-text px-2 py-[3px] font-mono text-[9px] text-on-accent">
            {entry.sticker}
          </span>
        ) : null}
        {entry.coverUrl ? null : <span className={TITLE_CLASS}>{entry.title}</span>}
      </div>
      {pose.interactive ? (
        <button
          type="button"
          aria-label={showLabel}
          aria-pressed={isActive}
          onClick={() => onSelect(index)}
          className="absolute inset-0 cursor-pointer"
        />
      ) : null}
    </CaseFrame>
  );
});

export function EmptyGameCase({ title }: { title: string }) {
  return (
    <CaseFrame pose={getCasePose(0, 0)} isActive title={title} frontClassName="game-case-empty">
      <div className={`${BAND_CLASS} ${EMPTY_BAND_CLASS}`}>
        <span />
      </div>
      <Watermark />
      <div className="absolute inset-x-3.5 bottom-3.5 flex flex-col gap-1.5">
        <span className={TITLE_CLASS}>{title}</span>
      </div>
    </CaseFrame>
  );
}
