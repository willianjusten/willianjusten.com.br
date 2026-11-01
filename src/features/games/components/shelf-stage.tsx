"use client";

/* The stage is a keyboard-operable carousel: arrow keys page it and focus rests on it. */
/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex, jsx-a11y/prefer-tag-over-role */

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useRef, type PointerEvent, type Ref } from "react";
import { clampIndex, formatCounter, indexAfterDrag, indexAfterKey } from "../lib/coverflow";
import type { ShelfCase } from "../lib/shelf-cases";
import { EmptyGameCase, GameCase } from "./game-case";

/** Pointer travel that turns a press into a drag, so it no longer selects a case. */
const DRAG_SLOP_IN_PIXELS = 8;
const NAV_BUTTON_CLASS =
  "absolute top-1/2 z-500 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-surface/80 text-text transition-colors hover:border-line-hover disabled:opacity-40";

export type ShelfStageLabels = {
  stageLabel: string;
  previous: string;
  next: string;
  counterHint: string;
};

type ShelfStageProps = {
  labels: ShelfStageLabels;
  cases: readonly ShelfCase[];
  activeIndex: number;
  emptyTitle: string;
  stageRef: Ref<HTMLDivElement>;
  onChangeIndex: (index: number) => void;
  /** Keeps focus on the stage, since a case's button unmounts once it drifts out of view. */
  onFocusStage: () => void;
};

export function ShelfStage({
  labels,
  cases,
  activeIndex,
  emptyTitle,
  stageRef,
  onChangeIndex,
  onFocusStage,
}: ShelfStageProps) {
  const dragStartX = useRef<number | undefined>(undefined);
  const hasDragged = useRef(false);
  const goTo = (index: number) => onChangeIndex(clampIndex(index, cases.length));

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    dragStartX.current = event.clientX;
    hasDragged.current = false;
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (
      dragStartX.current !== undefined &&
      Math.abs(event.clientX - dragStartX.current) > DRAG_SLOP_IN_PIXELS
    ) {
      hasDragged.current = true;
    }
  }

  function handlePointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (dragStartX.current === undefined) return;
    onChangeIndex(indexAfterDrag(activeIndex, event.clientX - dragStartX.current, cases.length));
    dragStartX.current = undefined;
    // Clears after the click that follows pointerup, so a drag never selects a case.
    setTimeout(() => {
      hasDragged.current = false;
    }, 0);
  }

  const caseCount = cases.length;
  const selectCase = useCallback(
    (index: number) => {
      if (hasDragged.current) return;
      onChangeIndex(clampIndex(index, caseCount));
      onFocusStage();
    },
    [caseCount, onChangeIndex, onFocusStage],
  );

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={labels.stageLabel}
      ref={stageRef}
      tabIndex={0}
      onKeyDown={(event) => {
        const nextIndex = indexAfterKey(activeIndex, event.key, cases.length);
        if (nextIndex === undefined) return;
        event.preventDefault();
        onChangeIndex(nextIndex);
        if (event.target instanceof HTMLElement && event.target.closest(".game-case")) {
          onFocusStage();
        }
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
      className="games-stage relative h-117.5 cursor-grab touch-pan-y select-none active:cursor-grabbing overflow-hidden -outline-offset-2"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-30 border-t border-white/4 bg-linear-to-b/srgb from-transparent to-white/2.5" />
      <div className="absolute top-12 left-1/2 size-0 [transform-style:preserve-3d]">
        {cases.length > 0 ? (
          cases.map((shelfCase, index) => (
            <GameCase
              key={shelfCase.key}
              entry={shelfCase.entry}
              index={index}
              activeIndex={activeIndex}
              badgeText={shelfCase.badgeText}
              showLabel={shelfCase.showLabel}
              onSelect={selectCase}
            />
          ))
        ) : (
          <EmptyGameCase title={emptyTitle} />
        )}
      </div>

      <button
        type="button"
        aria-label={labels.previous}
        disabled={activeIndex === 0}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={() => goTo(activeIndex - 1)}
        className={`${NAV_BUTTON_CLASS} left-4`}
      >
        <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={labels.next}
        disabled={activeIndex >= cases.length - 1}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={() => goTo(activeIndex + 1)}
        className={`${NAV_BUTTON_CLASS} right-4`}
      >
        <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
      </button>

      <p className="pointer-events-none absolute inset-x-0 bottom-3 m-0 text-center font-mono text-xs text-text-faint">
        {formatCounter(activeIndex, cases.length)} · {labels.counterHint}
      </p>
    </div>
  );
}
