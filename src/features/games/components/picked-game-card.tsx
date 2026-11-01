import { X } from "lucide-react";
import { pickPrimaryPlatform, type IgdbSearchResult } from "../lib/igdb";
import { PLATFORM_STYLES } from "../lib/platforms";
import { CoverThumb } from "./cover-thumb";

type PickedGameCardProps = {
  game: IgdbSearchResult;
  chooseAnotherLabel: string;
  onClear: () => void;
};

function formatMeta({ year, platforms }: Pick<IgdbSearchResult, "year" | "platforms">): string {
  const platformNames = platforms.map((platform) => PLATFORM_STYLES[platform].name);
  return [year, ...platformNames].filter(Boolean).join(" · ");
}

export function PickedGameCard({ game, chooseAnotherLabel, onClear }: PickedGameCardProps) {
  return (
    <div className="flex items-center gap-3.5 rounded-lg border border-line-strong bg-bg p-3">
      <CoverThumb
        coverUrl={game.coverUrl}
        platform={pickPrimaryPlatform(game.platforms)}
        sizeClass="h-16.5 w-13 shadow-(--shadow-1)"
        bandHeightClass="h-3"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate text-base font-bold">{game.title}</span>
        <span className="font-mono text-caption text-text-muted">{formatMeta(game)}</span>
      </div>
      <button
        type="button"
        aria-label={chooseAnotherLabel}
        onClick={onClear}
        className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-text transition-colors hover:border-line-hover"
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  );
}
