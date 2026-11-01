"use client";

import dynamic from "next/dynamic";
import type { Ref } from "react";
import type { ShotGameLabels } from "./shot-game";
import { useNearViewport } from "@/shared/hooks/use-near-viewport";

const ShotGamePlaceholder = ({ elementRef }: { elementRef?: Ref<HTMLDivElement> }) => (
  <div
    ref={elementRef}
    className="min-w-0 flex-[999_1_560px] rounded-xl border border-line-strong bg-bg-sunken"
  >
    <div className="h-[400px]" />
  </div>
);

const ShotGame = dynamic(() => import("./shot-game").then((module) => module.ShotGame), {
  ssr: false,
  loading: () => <ShotGamePlaceholder />,
});

/** The canvas game chunk is only requested once the section nears the viewport. */
export function ShotGameLoader({ labels }: { labels: ShotGameLabels }) {
  const { elementRef, isNearViewport } = useNearViewport<HTMLDivElement>();
  return isNearViewport ? (
    <ShotGame labels={labels} />
  ) : (
    <ShotGamePlaceholder elementRef={elementRef} />
  );
}
