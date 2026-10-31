"use client";

import dynamic from "next/dynamic";
import type { ShotGameLabels } from "./shot-game";

/** The canvas game loads after first paint, in its own chunk, and never renders on the server. */
const ShotGame = dynamic(() => import("./shot-game").then((module) => module.ShotGame), {
  ssr: false,
  loading: () => (
    <div className="min-w-0 flex-[999_1_560px] rounded-xl border border-line-strong bg-bg-sunken">
      <div className="h-[400px]" />
    </div>
  ),
});

export function ShotGameLoader({ labels }: { labels: ShotGameLabels }) {
  return <ShotGame labels={labels} />;
}
