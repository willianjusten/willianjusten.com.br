import { Globe as GlobeIcon, Minus, Plus } from "lucide-react";
import type { PointerEvent } from "react";

const ZOOM_STEP_FACTOR = 2;
const CONTROL_CLASS =
  "flex size-11 items-center justify-center rounded-md border border-line-strong bg-surface-raised text-text transition-colors hover:border-line-hover hover:bg-surface-hover";

export type GlobeControlsLabels = {
  zoomIn: string;
  zoomOut: string;
  reset: string;
  hint: string;
};

type GlobeControlsProps = {
  labels: GlobeControlsLabels;
  onZoomBy: (factor: number) => void;
  onReset: () => void;
};

/** A press on a control must not start a globe drag underneath it. */
const stopDrag = (event: PointerEvent) => event.stopPropagation();

export function GlobeControls({ labels, onZoomBy, onReset }: GlobeControlsProps) {
  const zoomButtons = [
    { label: labels.zoomIn, icon: Plus, onClick: () => onZoomBy(ZOOM_STEP_FACTOR) },
    { label: labels.zoomOut, icon: Minus, onClick: () => onZoomBy(1 / ZOOM_STEP_FACTOR) },
    { label: labels.reset, icon: GlobeIcon, onClick: onReset },
  ];

  return (
    <>
      <div className="absolute top-3 left-3 z-200 flex flex-col gap-1.5">
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

      <p className="pointer-events-none absolute bottom-3 left-3 z-200 font-mono text-overline text-text-faint">
        {labels.hint}
      </p>
    </>
  );
}
