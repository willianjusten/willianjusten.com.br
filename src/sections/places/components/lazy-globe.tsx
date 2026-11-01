"use client";

import dynamic from "next/dynamic";
import type { ComponentProps, Ref } from "react";
import { useNearViewport } from "@/shared/hooks/use-near-viewport";

const GlobePlaceholder = ({ elementRef }: { elementRef?: Ref<HTMLDivElement> }) => (
  <div
    ref={elementRef}
    aria-hidden="true"
    className="h-[460px] w-full rounded-xl border border-line bg-bg-sunken sm:h-[620px]"
  />
);

const Globe = dynamic(() => import("./globe").then((module) => module.Globe), {
  ssr: false,
  loading: () => <GlobePlaceholder />,
});

/** The globe chunk is only requested once the section nears the viewport; the frame holds its space. */
export function LazyGlobe(props: ComponentProps<typeof Globe>) {
  const { elementRef, isNearViewport } = useNearViewport<HTMLDivElement>();
  return isNearViewport ? <Globe {...props} /> : <GlobePlaceholder elementRef={elementRef} />;
}
