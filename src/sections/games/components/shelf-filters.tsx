"use client";

/* oxlint-disable jsx-a11y/prefer-tag-over-role */

import { SlidersHorizontal } from "lucide-react";
import { useId, useState, type Ref } from "react";
import { GAME_PLATFORMS } from "@/content/games";
import { PLATFORM_STYLES, platformDotClass } from "../lib/platforms";
import type { PlatformFilter } from "../lib/shelf";
import { SHELF_LISTS, type ShelfList } from "../lib/shelf-cases";

const PLATFORM_FILTERS: PlatformFilter[] = ["all", ...GAME_PLATFORMS];
/** Phones scroll the chips sideways with a fade at the edge; from sm up they wrap. */
const SCROLLING_ROW_CLASS =
  "[scrollbar-width:none] -my-1 gap-2 overflow-x-auto py-1 [mask-image:linear-gradient(to_right,black_85%,transparent)] sm:flex-wrap sm:overflow-visible sm:[mask-image:none]";

export type ShelfFiltersLabels = {
  tabsLabel: string;
  platformsLabel: string;
  all: string;
  tabs: Record<ShelfList, string>;
};

type ShelfFiltersProps = {
  labels: ShelfFiltersLabels;
  activeList: ShelfList;
  listCounts: Record<ShelfList, number>;
  platform: PlatformFilter;
  platformCounts: Record<PlatformFilter, number>;
  tabsRef: Ref<HTMLDivElement>;
  onChooseList: (list: ShelfList) => void;
  onChoosePlatform: (platform: PlatformFilter) => void;
};

export function ShelfFilters({
  labels,
  activeList,
  listCounts,
  platform,
  platformCounts,
  tabsRef,
  onChooseList,
  onChoosePlatform,
}: ShelfFiltersProps) {
  const [isPlatformMenuOpen, setIsPlatformMenuOpen] = useState(false);
  const platformGroupId = useId();
  const isPlatformFilterOff = activeList === "recommended";

  return (
    <>
      <div className="mb-3 flex items-center gap-2 sm:mb-6">
        <div
          ref={tabsRef}
          role="group"
          aria-label={labels.tabsLabel}
          className={`${SCROLLING_ROW_CLASS} flex min-w-0 flex-1 scroll-mt-24`}
        >
          {SHELF_LISTS.map((list) => {
            const isActive = list === activeList;
            return (
              <button
                key={list}
                type="button"
                aria-pressed={isActive}
                onClick={() => onChooseList(list)}
                className={`inline-flex min-h-10 shrink-0 cursor-pointer items-center gap-2 rounded-pill border px-4 text-small font-medium whitespace-nowrap transition-colors sm:min-h-11 sm:px-5 sm:text-ui ${
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
        <button
          type="button"
          aria-label={labels.platformsLabel}
          aria-expanded={isPlatformMenuOpen}
          aria-controls={platformGroupId}
          disabled={isPlatformFilterOff}
          onClick={() => setIsPlatformMenuOpen((wasOpen) => !wasOpen)}
          className={`relative inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-pill border transition-colors disabled:cursor-default disabled:opacity-40 sm:hidden ${
            isPlatformMenuOpen
              ? "border-line-hover bg-surface-raised text-white"
              : "border-line-strong bg-transparent text-text"
          }`}
        >
          <SlidersHorizontal size={16} strokeWidth={1.8} aria-hidden="true" />
          {platform !== "all" && !isPlatformFilterOff ? (
            <span
              aria-hidden="true"
              className={`absolute top-1.5 right-1.5 size-2 rounded-full ${platformDotClass(platform)}`}
            />
          ) : null}
        </button>
      </div>

      <div
        id={platformGroupId}
        role="group"
        aria-label={labels.platformsLabel}
        className={`${SCROLLING_ROW_CLASS} mb-3 sm:mb-4 sm:flex ${
          isPlatformMenuOpen && !isPlatformFilterOff ? "flex" : "hidden"
        }`}
      >
        {PLATFORM_FILTERS.map((filter) => {
          const isActive = filter === platform;
          const count = platformCounts[filter];
          const isDimmed = filter !== "all" && count === 0;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={isActive}
              disabled={isPlatformFilterOff}
              onClick={() => onChoosePlatform(filter)}
              className={`inline-flex min-h-10 shrink-0 cursor-pointer items-center gap-2 rounded-pill border px-3.5 text-eyebrow whitespace-nowrap transition-colors sm:min-h-11 ${
                isActive
                  ? "border-line-hover bg-surface-raised text-white"
                  : "border-line bg-transparent text-text-2 hover:border-line-hover"
              } ${isDimmed ? "opacity-45" : ""}`}
            >
              <span
                aria-hidden="true"
                className={`size-2.5 rounded-full ${platformDotClass(filter)}`}
              />
              {filter === "all" ? labels.all : PLATFORM_STYLES[filter].name}
              <span className="font-mono text-[11px] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
