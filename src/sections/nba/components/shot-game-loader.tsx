"use client";

import dynamic from "next/dynamic";
import type { Ref } from "react";
import type { ShotGameLabels } from "./shot-game";
import { useNearViewport } from "@/shared/hooks/use-near-viewport";
import { COURT_HEIGHT_CLASS, SHOT_GAME_FRAME_CLASS } from "./shot-game-frame";

const ShotGamePlaceholder = ({ elementRef }: { elementRef?: Ref<HTMLDivElement> }) => (
  <div ref={elementRef} className={SHOT_GAME_FRAME_CLASS}>
    <div className={COURT_HEIGHT_CLASS} />
  </div>
);

const ShotGame = dynamic(() => import("./shot-game").then((module) => module.ShotGame), {
  ssr: false,
  loading: () => <ShotGamePlaceholder />,
});

export function ShotGameLoader({ labels }: { labels: ShotGameLabels }) {
  const { elementRef, isNearViewport } = useNearViewport<HTMLDivElement>();
  return isNearViewport ? (
    <ShotGame labels={labels} />
  ) : (
    <ShotGamePlaceholder elementRef={elementRef} />
  );
}
