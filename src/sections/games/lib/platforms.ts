import type { GamePlatform } from "@/content/games";
import type { PlatformFilter } from "./shelf";

export type PlatformStyle = {
  name: string;
  bandText: string;
  bandClass: string;
  dotClass: string;
};

export const PLATFORM_STYLES: Record<GamePlatform, PlatformStyle> = {
  ps5: { name: "PS5", bandText: "PS5", bandClass: "bg-ps5 text-white", dotClass: "bg-ps5-dot" },
  xbox: {
    name: "Xbox Series X",
    bandText: "XBOX SERIES X",
    bandClass: "bg-xbox text-white",
    dotClass: "bg-xbox-dot",
  },
  switch2: {
    name: "Switch 2",
    bandText: "SWITCH 2",
    bandClass: "bg-switch text-white",
    dotClass: "bg-switch-dot",
  },
  rog: {
    name: "ROG Ally X",
    bandText: "ROG ALLY X",
    bandClass: "bg-rog text-white",
    dotClass: "bg-rog-dot",
  },
};

export const EMPTY_BAND_CLASS = "bg-line-strong text-text-faint";

export function platformDotClass(filter: PlatformFilter): string {
  return filter === "all" ? "dot-all" : PLATFORM_STYLES[filter].dotClass;
}
