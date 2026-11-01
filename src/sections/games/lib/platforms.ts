import type { GamePlatform } from "@/content/games";

export type PlatformStyle = {
  name: string;
  bandText: string;
};

export const PLATFORM_STYLES: Record<GamePlatform, PlatformStyle> = {
  ps5: { name: "PS5", bandText: "PS5" },
  xbox: { name: "Xbox Series X", bandText: "XBOX SERIES X" },
  switch2: { name: "Switch 2", bandText: "SWITCH 2" },
  rog: { name: "ROG Ally X", bandText: "ROG ALLY X" },
};
