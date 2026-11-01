/* The combobox input handles the keys; options only take clicks. */
/* oxlint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-element-to-interactive-role, jsx-a11y/prefer-tag-over-role */

import { pickPrimaryPlatform, type IgdbSearchResult } from "../lib/igdb";
import { PLATFORM_STYLES } from "../lib/platforms";
import { CoverThumb } from "./cover-thumb";

type SearchResultOptionProps = {
  id: string;
  result: IgdbSearchResult;
  isHighlighted: boolean;
  onPick: (result: IgdbSearchResult) => void;
};

export function SearchResultOption({ id, result, isHighlighted, onPick }: SearchResultOptionProps) {
  return (
    <li
      id={id}
      role="option"
      aria-selected={isHighlighted}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => onPick(result)}
      className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-sm p-2 ${
        isHighlighted ? "bg-surface-hover" : "hover:bg-surface-hover"
      }`}
    >
      <CoverThumb
        coverUrl={result.coverUrl}
        platform={pickPrimaryPlatform(result.platforms)}
        sizeClass="h-11 w-8.5"
        bandHeightClass="h-2"
      />
      <span className="flex min-w-0 flex-col gap-1">
        <span className="truncate text-sm font-semibold text-text">
          {result.title}
          {result.year ? (
            <span className="font-normal text-text-faint"> · {result.year}</span>
          ) : null}
        </span>
        <span className="flex flex-wrap gap-1">
          {result.platforms.map((platform) => (
            <span
              key={platform}
              className={`rounded-xs px-1.5 py-px font-mono text-tag tracking-[0.5px] ${PLATFORM_STYLES[platform].bandClass}`}
            >
              {PLATFORM_STYLES[platform].bandText}
            </span>
          ))}
        </span>
      </span>
    </li>
  );
}
