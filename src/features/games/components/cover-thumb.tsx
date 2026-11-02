import Image from "next/image";
import type { GamePlatform } from "@/content/games";
import { platformStyle } from "../lib/platforms";

type CoverThumbProps = {
  coverUrl: string | null;
  /** A shelf platform, or IGDB's name for one the shelf does not have. */
  platform: GamePlatform | string;
  sizeClass: string;
  bandHeightClass: string;
};

export function CoverThumb({ coverUrl, platform, sizeClass, bandHeightClass }: CoverThumbProps) {
  return (
    <span
      aria-hidden="true"
      className={`relative block shrink-0 overflow-hidden rounded-xs bg-surface-hover ${sizeClass}`}
    >
      {coverUrl ? (
        <Image src={coverUrl} alt="" fill sizes="52px" className="object-cover" />
      ) : (
        <span
          className={`absolute inset-x-0 top-0 block ${bandHeightClass} ${platformStyle(platform).bandClass}`}
          title={platformStyle(platform).name}
        />
      )}
    </span>
  );
}
