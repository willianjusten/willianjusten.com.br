import { Star } from "lucide-react";
import { MAX_RATING } from "@/content/games";

const STAR_SIZE_IN_PIXELS = 18;

type StarRatingProps = {
  rating: number;
  /** Contains `{rating}` and `{max}`, e.g. "4 out of 5 stars". */
  label: string;
};

/** Filled stars up to the rating, outlined ones for the rest, read out as one phrase. */
export function StarRating({ rating, label }: StarRatingProps) {
  const accessibleLabel = label
    .replace("{rating}", String(rating))
    .replace("{max}", String(MAX_RATING));

  return (
    <p className="m-0 flex gap-1">
      <span className="sr-only">{accessibleLabel}</span>
      {Array.from({ length: MAX_RATING }, (_, index) => {
        const isFilled = index < rating;
        return (
          <Star
            key={index}
            aria-hidden="true"
            size={STAR_SIZE_IN_PIXELS}
            strokeWidth={1.8}
            fill={isFilled ? "currentColor" : "none"}
            className={isFilled ? "text-accent" : "text-text-faint"}
          />
        );
      })}
    </p>
  );
}
