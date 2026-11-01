import Image from "next/image";
import type { GamePlatform } from "@/content/games";
import { PLATFORM_STYLES } from "../lib/platforms";

type CoverThumbProps = {
  coverUrl: string | null;
  platform: GamePlatform;
  sizeClass: string;
  bandClass: string;
};

export function CoverThumb({ coverUrl, platform, sizeClass, bandClass }: CoverThumbProps) {
  return (
    <span
      aria-hidden="true"
      className={`relative block shrink-0 overflow-hidden rounded-xs bg-surface-hover ${sizeClass}`}
    >
      {coverUrl ? (
        <Image src={coverUrl} alt="" fill sizes="52px" className="object-cover" />
      ) : (
        <span
          className={`absolute inset-x-0 top-0 block ${bandClass} band-${platform}`}
          title={PLATFORM_STYLES[platform].name}
        />
      )}
    </span>
  );
}
