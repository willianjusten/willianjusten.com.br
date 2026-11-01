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
import { RecommendForm } from "./recommend-form";
import { StarRating } from "./star-rating";
import type { RecommendFormLabels } from "./recommend-form";
import type { CaseEntry, ShelfEntry } from "./types";
import { useGameReactions } from "./use-game-reactions";
import { useGameRecommendations } from "./use-game-recommendations";
import type { RecommendationSubmission } from "./use-game-recommendations";

type ShelfList = GameList | "recommended";

const TAB_ORDER: ShelfList[] = ["playing", "played", "wishlist", "recommended"];
const PLATFORM_FILTERS: PlatformFilter[] = ["all", ...GAME_PLATFORMS];
const FOCUS_DELAY_IN_MILLISECONDS = 50;
const STAGE_HEIGHT_CLASS = "h-[470px]";
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
  voteRateLimited: string;
  /** Shown on the Recommended tab once this browser has recommended the game. */
  reactionPressedRecommended: string;
  /** Contains `{count}`. */
  sticker: string;
  pendingSticker: string;
  pendingNote: string;
  /** Contains `{rating}` and `{max}`. */
  rating: string;
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
  form: RecommendFormLabels;
};

/** Everything the details strip and a case need about one game on the active tab. */
type ShelfCase = {
  key: string;
  entry: CaseEntry;
  year: number | string | null;
  badgeText: string;
  note: string;
  rating: number | null;
  showLabel: string;
  reaction: { pressed: boolean; count: number; isEnabled: boolean; toggle: () => void };
  /** Slug of the played or playing game the "like this" link refers to. */
  similarSlug: string | null;
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
  const { recommendations, voteError, submit, toggleVote } = useGameRecommendations();
  const dragStartX = useRef<number | undefined>(undefined);
  const hasDragged = useRef(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const listCounts = { ...countByList(games), recommended: recommendations.length };
  const platformCounts =
    activeList === "recommended"
      ? countByPlatform([], "playing")
      : countByPlatform(games, activeList);

  const cases: ShelfCase[] =
    activeList === "recommended"
      ? recommendations.map((recommendation) => ({
          key: `recommendation-${recommendation.id}`,
          entry: {
            title: recommendation.title,
            platform: recommendation.platform,
            tone: "var(--surface-hover)",
            coverUrl: recommendation.coverUrl,
            sticker:
              recommendation.status === "pending"
                ? labels.pendingSticker
                : labels.sticker.replace("{count}", String(recommendation.count)),
          },
          year: recommendation.year,
          badgeText: `×${recommendation.count}`,
          note: recommendation.status === "pending" ? labels.pendingNote : "",
          rating: null,
          showLabel: labels.showGame.replace("{title}", recommendation.title),
          reaction: {
            pressed: recommendation.mine,
            count: recommendation.count,
            isEnabled: recommendation.status === "approved",
            toggle: () => toggleVote(recommendation.id),
          },
          similarSlug: null,
        }))
      : filterShelf(games, activeList, platform).map((game) => ({
          key: game.slug,
          entry: game,
          year: game.year ?? null,
          badgeText: game.list === "wishlist" ? labels.soon : String(game.year),
          note: game.note,
          rating: game.list === "played" ? (game.rating ?? null) : null,
          showLabel: labels.showGame.replace("{title}", game.title),
          reaction: {
            pressed: mine.has(game.slug),
            count: reactionCounts[game.slug] ?? 0,
            isEnabled: true,
            toggle: () => toggle(game.slug),
          },
          similarSlug: game.list === "wishlist" ? null : game.slug,
        }));
  const hasEntries = cases.length > 0;
  const activeIndex = clampIndex(rawIndex, cases.length);
  const activeCase = hasEntries ? cases[activeIndex] : null;

  const goTo = (index: number) => setRawIndex(clampIndex(index, cases.length));

  function chooseList(list: ShelfList) {
    setActiveList(list);
    setRawIndex(0);
  }

  function choosePlatform(nextPlatform: PlatformFilter) {
    setPlatform(nextPlatform);
    setRawIndex(0);
  }

  function openRecommended() {
    chooseList("recommended");
    tabsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function focusRecommendForm() {
    setTimeout(() => searchInputRef.current?.focus(), FOCUS_DELAY_IN_MILLISECONDS);
  }

  async function submitRecommendation(submission: RecommendationSubmission) {
    const outcome = await submit(submission);
    const saved = outcome.kind === "saved" ? outcome.recommendation : null;
    if (outcome.kind === "saved" && saved) {
      setActiveList("recommended");
      setPlatform("all");
      setRawIndex(outcome.recommendations.findIndex((item) => item.id === saved.id));
    }
    return outcome;
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
    const nextIndex = indexAfterDrag(activeIndex, event.clientX - dragStartX.current, cases.length);
    dragStartX.current = undefined;
    setRawIndex(nextIndex);
    // Clears after the click that follows pointerup, so a drag never selects a case.
    setTimeout(() => {
      hasDragged.current = false;
    }, 0);
  }

  /**
   * A case's button unmounts once the case drifts out of view, which would drop focus to the
   * page and stop the arrow keys. Focus sits on the stage instead, which never unmounts.
   */
  function focusStage() {
    stageRef.current?.focus({ preventScroll: true });
  }

  function selectCase(index: number) {
    if (!hasDragged.current) {
      goTo(index);
      focusStage();
    }
  }

  const emptyTitle =
    activeList === "recommended" ? labels.emptyRecommendedTitle : labels.emptyTitle;
  const emptyNote = activeList === "recommended" ? labels.emptyRecommendedNote : labels.emptyNote;
  const reaction = activeCase?.reaction;
  const isReacted = reaction?.pressed ?? false;
  const reactionLabel = labels.reaction[activeList];
  const pressedReactionLabel =
    activeList === "recommended"
      ? labels.reactionPressedRecommended
      : `${reactionLabel} · ${reaction?.count ?? 0}`;
  const similarSlug = activeCase?.similarSlug ?? null;
  const reactionErrorText =
    voteError === "rate_limited"
      ? labels.voteRateLimited
      : voteError || hasError
        ? labels.reactionError
        : null;

  return (
    <div className="mt-10">
      <div
        ref={tabsRef}
        role="group"
        aria-label={labels.tabsLabel}
        className="mb-6 flex scroll-mt-24 flex-wrap gap-2"
      >
        {TAB_ORDER.map((list) => {
          const isActive = list === activeList;
          return (
            <button
              key={list}
              type="button"
              aria-pressed={isActive}
              onClick={() => chooseList(list)}
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-pill border px-5 text-ui font-medium transition-colors ${
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
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-pill border px-3.5 text-eyebrow transition-colors ${
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
          ref={stageRef}
          tabIndex={0}
          onKeyDown={(event) => {
            const nextIndex = indexAfterKey(activeIndex, event.key, cases.length);
            if (nextIndex !== undefined) {
              event.preventDefault();
              setRawIndex(nextIndex);
              if (event.target instanceof HTMLElement && event.target.closest(".game-case")) {
                focusStage();
              }
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
          <div className="absolute top-12 left-1/2 size-0 [transform-style:preserve-3d]">
            {hasEntries ? (
              cases.map((shelfCase, index) => (
                <GameCase
                  key={shelfCase.key}
                  entry={shelfCase.entry}
                  index={index}
                  activeIndex={activeIndex}
                  badgeText={shelfCase.badgeText}
                  emptyTitle={emptyTitle}
                  showLabel={shelfCase.showLabel}
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
            disabled={activeIndex >= cases.length - 1}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => goTo(activeIndex + 1)}
            className={`${NAV_BUTTON_CLASS} right-4 disabled:opacity-40`}
          >
            <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
          </button>

          <p className="pointer-events-none absolute inset-x-0 bottom-3 m-0 text-center font-mono text-xs text-text-faint">
            {formatCounter(activeIndex, cases.length)} · {labels.counterHint}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-line px-7 pt-5 pb-6">
          <div aria-live="polite" className="flex min-w-0 flex-[1_1_340px] flex-col gap-1.5">
            <p className="m-0 font-mono text-xs text-accent">
              {[
                labels.status[activeList],
                ...(activeCase
                  ? [PLATFORM_STYLES[activeCase.entry.platform].name, activeCase.year]
                  : []),
              ]
                .filter((part) => part !== null)
                .join(" · ")}
            </p>
            <h3 className="m-0 font-display text-[30px] leading-none font-extrabold tracking-[-0.02em]">
              {activeCase?.entry.title ?? emptyTitle}
            </h3>
            {activeCase?.rating ? (
              <StarRating rating={activeCase.rating} label={labels.rating} />
            ) : null}
            {(activeCase?.note ?? emptyNote) !== "" ? (
              <p className="m-0 text-ui text-text-2">{activeCase?.note ?? emptyNote}</p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={isReacted}
              disabled={!reaction?.isEnabled}
              onClick={reaction?.toggle}
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-pill border px-[18px] text-sm transition-colors disabled:cursor-default disabled:opacity-40 ${
                isReacted
                  ? "border-accent bg-accent/15 text-white"
                  : "border-line-strong bg-transparent text-text hover:border-line-hover"
              }`}
            >
              <Heart size={16} aria-hidden="true" fill={isReacted ? "currentColor" : "none"} />
              {isReacted ? pressedReactionLabel : reactionLabel}
            </button>
            {similarSlug ? (
              <a
                href="#recommend"
                onClick={focusRecommendForm}
                className="inline-flex min-h-11 items-center gap-2 rounded-pill border border-line-strong px-[18px] text-sm text-text no-underline transition-colors hover:border-line-hover"
              >
                {labels.recommendLike}
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            ) : null}
          </div>
          {reactionErrorText ? (
            <p role="alert" className="m-0 basis-full text-sm text-text-muted">
              {reactionErrorText}
            </p>
          ) : null}
        </div>
      </div>

      <RecommendForm
        labels={labels.form}
        searchInputRef={searchInputRef}
        recommendedCount={recommendations.length}
        onOpenRecommended={openRecommended}
        onSubmit={submitRecommendation}
      />

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
