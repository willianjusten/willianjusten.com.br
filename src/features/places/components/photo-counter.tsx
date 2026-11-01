import { fillTemplate } from "@/lib/fill-template";

type PhotoCounterProps = {
  photoIndex: number;
  total: number;
  /** Contains `{index}` and `{total}`. */
  label: string;
  className?: string;
};

export function PhotoCounter({ photoIndex, total, label, className = "" }: PhotoCounterProps) {
  return (
    <p
      aria-live="polite"
      className={`rounded-pill bg-bg/70 px-2.5 py-0.5 font-mono text-overline text-text ${className}`}
    >
      <span aria-hidden="true">
        {photoIndex + 1} / {total}
      </span>
      <span className="sr-only">{fillTemplate(label, { index: photoIndex + 1, total })}</span>
    </p>
  );
}
