"use client";

import dynamic from "next/dynamic";

/** The globe loads after first paint; until then the frame holds its space. */
const Globe = dynamic(() => import("./globe").then((module) => module.Globe), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="h-[460px] w-full rounded-xl border border-line bg-bg-sunken sm:h-[620px]"
    />
  ),
});

export { Globe as LazyGlobe };
