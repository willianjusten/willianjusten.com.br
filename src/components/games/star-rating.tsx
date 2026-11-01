import { Star } from "lucide-react";
import { useLocale } from "next-intl";
import { MAX_RATING } from "@/content/games";

const STAR_SIZE_IN_PIXELS = 18;
const STAR_STROKE_WIDTH = 1.8;

type StarRatingProps = {
  /** Whole or half stars, e.g. 3.5. */
  rating: number;
  /** Contains `{rating}` and `{max}`, e.g. "4 out of 5 stars". */
  label: string;
};

/** How much of the star at `index` is filled: 1, 0.5 or 0. */
function starFill(rating: number, index: number): number {
  return Math.min(1, Math.max(0, rating - index));
}

/** Filled stars up to the rating, a half-filled one for a .5, outlines for the rest. */
export function StarRating({ rating, label }: StarRatingProps) {
  const locale = useLocale();
  const accessibleLabel = label
    .replace("{rating}", rating.toLocaleString(locale))
    .replace("{max}", String(MAX_RATING));

  return (
    <p className="m-0 flex gap-1">
      <span className="sr-only">{accessibleLabel}</span>
      {Array.from({ length: MAX_RATING }, (_, index) => {
        const fill = starFill(rating, index);
        return (
          <span key={index} aria-hidden="true" className="relative inline-flex">
            <Star
              size={STAR_SIZE_IN_PIXELS}
              strokeWidth={STAR_STROKE_WIDTH}
              className={fill === 0 ? "text-text-faint" : "text-accent"}
            />
            {fill > 0 ? (
              <span
                className="absolute inset-y-0 left-0 overflow-hidden text-accent"
                style={{ width: `${fill * 100}%` }}
              >
                <Star
                  size={STAR_SIZE_IN_PIXELS}
                  strokeWidth={STAR_STROKE_WIDTH}
                  fill="currentColor"
                />
              </span>
            ) : null}
          </span>
        );
      })}
    </p>
  );
}
