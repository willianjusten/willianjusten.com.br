import { formatPercentage, formatShotCount, type PersonalStats } from "../lib/personal-stats";
import type { ShotTotals } from "../server/shot-stats";
import { BasketballIcon } from "./basketball-icon";

/** Wraps every two cells into a row on phones, so the odd cells get the divider on their left. */
const CELLS_PER_PHONE_ROW = 2;

export type ShotScoreboardLabels = {
  title: string;
  hint: string;
  onFireHint: string;
  you: string;
  streak: string;
  best: string;
  allVisitors: string;
};

type ShotScoreboardProps = {
  labels: ShotScoreboardLabels;
  personalStats: PersonalStats;
  /** Null until the all-visitors totals load. */
  totals: ShotTotals | null;
  isOnFire: boolean;
};

type StatCell = { label: string; value: string; detail?: string; isAccent: boolean };

function formatMakesOfShots(makes: number, shots: number): string {
  return `${formatShotCount(makes)}/${formatShotCount(shots)}`;
}

/** The bar above the court: title and hint, then this visitor's stats beside everyone's. */
export function ShotScoreboard({ labels, personalStats, totals, isOnFire }: ShotScoreboardProps) {
  const statCells: StatCell[] = [
    {
      label: labels.you,
      value: formatMakesOfShots(personalStats.makes, personalStats.shots),
      isAccent: true,
    },
    { label: labels.streak, value: formatShotCount(personalStats.streak), isAccent: false },
    { label: labels.best, value: formatShotCount(personalStats.best), isAccent: false },
    {
      label: labels.allVisitors,
      value: totals ? formatMakesOfShots(totals.makes, totals.shots) : "-",
      detail: totals ? `${formatPercentage(totals.makes, totals.shots)}%` : undefined,
      isAccent: false,
    },
  ];

  return (
    <div className="flex flex-wrap border-b border-line bg-(image:--stage-gradient)">
      <div className="flex basis-full flex-col justify-center gap-0.5 px-5 py-3 sm:flex-[2_1_200px]">
        <span className="flex items-center gap-2 text-body font-semibold">
          <BasketballIcon size={18} className="text-accent" />
          {labels.title}
        </span>
        <span className="text-small text-text-muted">
          {isOnFire ? labels.onFireHint : labels.hint}
        </span>
      </div>
      {/* Phones: a 2x2 grid under the title. From sm up the wrapper dissolves into the row. */}
      <div className="grid basis-full grid-cols-2 border-t border-line sm:contents">
        {statCells.map((cell, cellIndex) => (
          <div
            key={cell.label}
            className={`flex flex-col justify-center gap-0.5 border-line px-5 py-3 sm:flex-[1_1_90px] sm:border-t-0 sm:border-l sm:px-[18px] ${
              cellIndex % CELLS_PER_PHONE_ROW === 1 ? "border-l" : ""
            } ${cellIndex >= CELLS_PER_PHONE_ROW ? "border-t" : ""}`}
          >
            <span className="font-mono text-micro tracking-[0.12em] whitespace-nowrap text-text-faint uppercase">
              {cell.label}
            </span>
            <span
              className={`font-mono text-[22px] leading-[1.1] font-medium whitespace-nowrap tabular-nums ${
                cell.isAccent ? "text-accent [text-shadow:0_0_14px_var(--accent)]" : "text-text"
              }`}
            >
              {cell.value}
            </span>
            {cell.detail ? (
              <span className="font-mono text-micro whitespace-nowrap text-text-muted tabular-nums">
                {cell.detail}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
