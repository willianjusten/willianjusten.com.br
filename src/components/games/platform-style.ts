import type { GamePlatform } from "@/content/games";

export type PlatformStyle = {
  /** Full console name, used in chips, the setup line and the details meta. */
  name: string;
  /** Text on the cover band. */
  bandText: string;
};

export const PLATFORM_STYLES: Record<GamePlatform, PlatformStyle> = {
  ps5: { name: "PS5", bandText: "PS5" },
  xbox: { name: "Xbox Series X", bandText: "XBOX SERIES X" },
  switch2: { name: "Switch 2", bandText: "SWITCH 2" },
  rog: { name: "ROG Ally X", bandText: "ROG ALLY X" },
  pc: { name: "PC", bandText: "PC" },
};
