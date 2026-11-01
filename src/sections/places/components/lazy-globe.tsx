"use client";

import dynamic from "next/dynamic";
import type { ComponentProps, Ref } from "react";
import { useNearViewport } from "@/shared/hooks/use-near-viewport";
import { GLOBE_FRAME_CLASS } from "./globe-frame";

const GlobePlaceholder = ({ elementRef }: { elementRef?: Ref<HTMLDivElement> }) => (
  <div ref={elementRef} aria-hidden="true" className={GLOBE_FRAME_CLASS} />
);

const Globe = dynamic(() => import("./globe").then((module) => module.Globe), {
  ssr: false,
  loading: () => <GlobePlaceholder />,
});

export function LazyGlobe(props: ComponentProps<typeof Globe>) {
  const { elementRef, isNearViewport } = useNearViewport<HTMLDivElement>();
  return isNearViewport ? <Globe {...props} /> : <GlobePlaceholder elementRef={elementRef} />;
}
