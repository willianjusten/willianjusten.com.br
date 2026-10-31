"use client";

/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex, jsx-a11y/prefer-tag-over-role */

import { ArrowRight, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import { GAME_PLATFORMS } from "@/content/games";
import type { GameList } from "@/content/games";
import { clampIndex, formatCounter, indexAfterDrag, indexAfterKey } from "@/lib/games/coverflow";
import { countByList, countByPlatform, filterShelf } from "@/lib/games/shelf";
import type { PlatformFilter } from "@/lib/games/shelf";
import { GameCase } from "./game-case";
import { PLATFORM_STYLES } from "./platform-style";
import type { ShelfEntry } from "./types";
import { useGameReactions } from "./use-game-reactions";

type ShelfList = GameList | "recommended";

const TAB_ORDER: ShelfList[] = ["playing", "played", "wishlist", "recommended"];
const PLATFORM_FILTERS: PlatformFilter[] = ["all", ...GAME_PLATFORMS];
const STAGE_HEIGHT_CLASS = "h-[430px]";
const NAV_BUTTON_CLASS =
  "absolute top-1/2 z-[500] flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-surface/80 text-text transition-colors hover:border-line-hover";

export type GamesShelfLabels = {
  tabsLabel: string;
  platformsLabel: string;
  all: string;
  tabs: Record<ShelfList, string>;
  status: Record<ShelfList, string>;
  reaction: Record<ShelfList, string>;
  reactionError: string;
  stageLabel: string;
  previous: string;
  next: string;
  /** Contains `{title}`. */
  showGame: string;
  counterHint: string;
  soon: string;
  emptyRecommendedTitle: string;
  emptyRecommendedNote: string;
  emptyTitle: string;
  emptyNote: string;
  recommendLike: string;
  setup: string;
};

type GamesShelfProps = {
  games: ShelfEntry[];
  labels: GamesShelfLabels;
};

export function GamesShelf({ games, labels }: GamesShelfProps) {
  const [activeList, setActiveList] = useState<ShelfList>("playing");
  const [platform, setPlatform] = useState<PlatformFilter>("all");
  const [rawIndex, setRawIndex] = useState(0);
  const { counts: reactionCounts, mine, hasError, toggle } = useGameReactions();
  const dragStartX = useRef<number | undefined>(undefined);
  const hasDragged = useRef(false);

  // Recommendations arrive with their own ticket; until then that shelf is empty.
  const recommendedGames: ShelfEntry[] = [];
  const listCounts = { ...countByList(games), recommended: recommendedGames.length };
  const platformCounts =
    activeList === "recommended"
      ? countByPlatform([], "playing")
      : countByPlatform(games, activeList);
  const entries =
    activeList === "recommended" ? recommendedGames : filterShelf(games, activeList, platform);
  const hasEntries = entries.length > 0;
  const activeIndex = clampIndex(rawIndex, entries.length);
  const activeEntry = hasEntries ? entries[activeIndex] : null;

  const goTo = (index: number) => setRawIndex(clampIndex(index, entries.length));

  function chooseList(list: ShelfList) {
    setActiveList(list);
    setRawIndex(0);
  }

  function choosePlatform(nextPlatform: PlatformFilter) {
    setPlatform(nextPlatform);
    setRawIndex(0);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    dragStartX.current = event.clientX;
    hasDragged.current = false;
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (dragStartX.current !== undefined && Math.abs(event.clientX - dragStartX.current) > 8) {
      hasDragged.current = true;
    }
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (dragStartX.current === undefined) {
      return;
    }
    const nextIndex = indexAfterDrag(
      activeIndex,
      event.clientX - dragStartX.current,
      entries.length,
    );
    dragStartX.current = undefined;
    setRawIndex(nextIndex);
    // Clears after the click that follows pointerup, so a drag never selects a case.
    setTimeout(() => {
      hasDragged.current = false;
    }, 0);
  }

  function selectCase(index: number) {
    if (!hasDragged.current) {
      goTo(index);
    }
  }

  const emptyTitle =
    activeList === "recommended" ? labels.emptyRecommendedTitle : labels.emptyTitle;
  const emptyNote = activeList === "recommended" ? labels.emptyRecommendedNote : labels.emptyNote;
  const isReacted = activeEntry ? mine.has(activeEntry.slug) : false;
  const reactionLabel = labels.reaction[activeList];
  const reactionCount = activeEntry ? (reactionCounts[activeEntry.slug] ?? 0) : 0;
  const canRecommendSimilar = activeEntry !== null && activeList !== "wishlist";

  return (
    <div className="mt-10">
      <div role="group" aria-label={labels.tabsLabel} className="mb-6 flex flex-wrap gap-2">
        {TAB_ORDER.map((list) => {
          const isActive = list === activeList;
          return (
            <button
              key={list}
              type="button"
              aria-pressed={isActive}
              onClick={() => chooseList(list)}
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-pill border px-5 text-[15px] font-medium transition-colors ${
                isActive
                  ? "border-accent bg-accent text-on-accent"
                  : "border-line-strong bg-transparent text-text hover:border-line-hover"
              }`}
            >
              {labels.tabs[list]}
              <span className="opacity-70">{listCounts[list]}</span>
            </button>
          );
        })}
      </div>

      <div role="group" aria-label={labels.platformsLabel} className="mb-4 flex flex-wrap gap-2">
        {PLATFORM_FILTERS.map((filter) => {
          const isActive = filter === platform;
          const count = platformCounts[filter];
          const isDimmed = filter !== "all" && count === 0;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              disabled={activeList === "recommended"}
              onClick={() => choosePlatform(filter)}
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-pill border px-3.5 text-[13px] transition-colors ${
                isActive
                  ? "border-line-hover bg-surface-raised text-white"
                  : "border-line bg-transparent text-text-2 hover:border-line-hover"
              } ${isDimmed ? "opacity-45" : ""}`}
            >
              <span
                aria-hidden="true"
                className={`size-2.5 rounded-full dot-${filter === "all" ? "all" : filter}`}
              />
              {filter === "all" ? labels.all : PLATFORM_STYLES[filter].name}
              <span className="font-mono text-[11px] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-surface">
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label={labels.stageLabel}
          tabIndex={0}
          onKeyDown={(event) => {
            const nextIndex = indexAfterKey(activeIndex, event.key, entries.length);
            if (nextIndex !== undefined) {
              event.preventDefault();
              setRawIndex(nextIndex);
            }
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onPointerLeave={handlePointerEnd}
          className={`games-stage relative ${STAGE_HEIGHT_CLASS} overflow-hidden outline-offset-[-2px]`}
        >
          <div className="games-floor pointer-events-none absolute inset-x-0 bottom-0 h-[120px]" />
          <div className="absolute top-[70px] left-1/2 size-0 [transform-style:preserve-3d]">
            {hasEntries ? (
              entries.map((entry, index) => (
                <GameCase
                  key={entry.slug}
                  entry={entry}
                  index={index}
                  activeIndex={activeIndex}
                  badgeText={entry.list === "wishlist" ? labels.soon : String(entry.year)}
                  emptyTitle={emptyTitle}
                  showLabel={labels.showGame.replace("{title}", entry.title)}
                  onSelect={selectCase}
                />
              ))
            ) : (
              <GameCase
                entry={null}
                index={0}
                activeIndex={0}
                badgeText=""
                emptyTitle={emptyTitle}
                showLabel=""
                onSelect={goTo}
              />
            )}
          </div>

          <button
            type="button"
            aria-label={labels.previous}
            disabled={activeIndex === 0}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => goTo(activeIndex - 1)}
            className={`${NAV_BUTTON_CLASS} left-4 disabled:opacity-40`}
          >
            <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={labels.next}
            disabled={activeIndex >= entries.length - 1}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => goTo(activeIndex + 1)}
            className={`${NAV_BUTTON_CLASS} right-4 disabled:opacity-40`}
          >
            <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
          </button>

          <p className="pointer-events-none absolute inset-x-0 bottom-3 m-0 text-center font-mono text-xs text-text-faint">
            {formatCounter(activeIndex, entries.length)} · {labels.counterHint}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-line px-7 pt-5 pb-6">
          <div aria-live="polite" className="flex min-w-0 flex-[1_1_340px] flex-col gap-1.5">
            <p className="m-0 font-mono text-xs text-accent">
              {labels.status[activeList]}
              {activeEntry
                ? ` · ${PLATFORM_STYLES[activeEntry.platform].name} · ${activeEntry.year}`
                : null}
            </p>
            <h3 className="m-0 font-display text-[30px] leading-none font-extrabold tracking-[-0.02em]">
              {activeEntry?.title ?? emptyTitle}
            </h3>
            <p className="m-0 text-[15px] text-text-2">{activeEntry?.note ?? emptyNote}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={isReacted}
              disabled={!activeEntry}
              onClick={() => activeEntry && toggle(activeEntry.slug)}
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-pill border px-[18px] text-sm transition-colors disabled:cursor-default disabled:opacity-40 ${
                isReacted
                  ? "border-accent bg-accent/15 text-white"
                  : "border-line-strong bg-transparent text-text hover:border-line-hover"
              }`}
            >
              <Heart size={16} aria-hidden="true" fill={isReacted ? "currentColor" : "none"} />
              {isReacted && reactionCount > 0
                ? `${reactionLabel} · ${reactionCount}`
                : reactionLabel}
            </button>
            {canRecommendSimilar ? (
              <a
                href="#recommend"
                className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-line-strong px-[18px] text-sm text-text no-underline transition-colors hover:border-line-hover"
              >
                {labels.recommendLike}
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            ) : null}
          </div>
          {hasError ? (
            <p role="alert" className="m-0 basis-full text-sm text-text-muted">
              {labels.reactionError}
            </p>
          ) : null}
        </div>
      </div>

      <p className="mt-6 mb-0 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-text-muted">
        {labels.setup}
        {GAME_PLATFORMS.map((setupPlatform) => (
          <span key={setupPlatform} className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className={`size-2 rounded-full dot-${setupPlatform}`} />
            {PLATFORM_STYLES[setupPlatform].name}
          </span>
        ))}
      </p>
    </div>
  );
}
