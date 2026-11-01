import { useId } from "react";

const LABEL_TEXT = "WJ · SIDE A · 33⅓ RPM · ";
/** The text circle sits inside the label edge, in the 100 unit viewBox. */
const TEXT_RADIUS = 37;
const TEXT_CIRCUMFERENCE = 2 * Math.PI * TEXT_RADIUS;

/** The centre label; its text runs around the edge so the spin reads at a glance. */
export function RecordLabel() {
  const pathId = useId();
  return (
    <div className="relative flex aspect-square w-[36%] items-center justify-center rounded-pill bg-accent">
      <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 size-full">
        <path
          id={pathId}
          fill="none"
          d={`M 50,${50 - TEXT_RADIUS} a ${TEXT_RADIUS},${TEXT_RADIUS} 0 1,1 0,${TEXT_RADIUS * 2} a ${TEXT_RADIUS},${TEXT_RADIUS} 0 1,1 0,-${TEXT_RADIUS * 2}`}
        />
        <circle
          cx="50"
          cy="50"
          r="27"
          fill="none"
          className="stroke-on-accent/25"
          strokeWidth="0.8"
        />
        <text fontSize={11} className="fill-on-accent font-mono font-medium">
          <textPath href={`#${pathId}`} textLength={TEXT_CIRCUMFERENCE - 2} lengthAdjust="spacing">
            {LABEL_TEXT}
          </textPath>
        </text>
      </svg>
      <div className="aspect-square w-[16%] rounded-pill bg-bg" />
    </div>
  );
}
