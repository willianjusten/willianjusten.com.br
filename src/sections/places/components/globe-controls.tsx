import { Globe as GlobeIcon, Minus, Play, Plus, Square } from "lucide-react";
import type { PointerEvent } from "react";

const ZOOM_STEP_FACTOR = 2;
const CONTROL_CLASS =
  "flex size-11 items-center justify-center rounded-md border border-line-strong bg-surface-raised text-text transition-colors hover:border-line-hover hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export type GlobeControlsLabels = {
  zoomIn: string;
  zoomOut: string;
  reset: string;
  hint: string;
  tour: { play: string; stop: string };
};

type GlobeControlsProps = {
  labels: GlobeControlsLabels;
  isTouring: boolean;
  onZoomBy: (factor: number) => void;
  onReset: () => void;
  onToggleTour: () => void;
};

/** A press on a control must not start a globe drag underneath it. */
const stopDrag = (event: PointerEvent) => event.stopPropagation();

/** Zoom and reset buttons in the top corner, the tour button and hint in the bottom one. */
export function GlobeControls({
  labels,
  isTouring,
  onZoomBy,
  onReset,
  onToggleTour,
}: GlobeControlsProps) {
  const zoomButtons = [
    { label: labels.zoomIn, icon: Plus, onClick: () => onZoomBy(ZOOM_STEP_FACTOR) },
    { label: labels.zoomOut, icon: Minus, onClick: () => onZoomBy(1 / ZOOM_STEP_FACTOR) },
    { label: labels.reset, icon: GlobeIcon, onClick: onReset },
  ];
  const TourIcon = isTouring ? Square : Play;

  return (
    <>
      <div className="absolute top-3 left-3 z-[200] flex flex-col gap-1.5">
        {zoomButtons.map(({ label, icon: Icon, onClick }) => (
          <button
            key={label}
            type="button"
            aria-label={label}
            onPointerDown={stopDrag}
            onClick={onClick}
            className={CONTROL_CLASS}
          >
            <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="absolute bottom-3 left-3 z-[200] flex flex-wrap items-center gap-3">
        <button
          type="button"
          aria-pressed={isTouring}
          onPointerDown={stopDrag}
          onClick={onToggleTour}
          className="flex min-h-11 cursor-pointer items-center gap-2 rounded-pill border-0 bg-(image:--ball-light) px-5 text-small font-semibold text-on-accent transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <TourIcon size={14} fill="currentColor" strokeWidth={0} aria-hidden="true" />
          {isTouring ? labels.tour.stop : labels.tour.play}
        </button>
        <p className="pointer-events-none m-0 font-mono text-overline text-text-faint">
          {labels.hint}
        </p>
      </div>
    </>
  );
}
