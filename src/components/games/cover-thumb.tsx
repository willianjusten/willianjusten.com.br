import Image from "next/image";
import type { GamePlatform } from "@/content/games";
import { PLATFORM_STYLES } from "./platform-style";

type CoverThumbProps = {
  coverUrl: string | null;
  platform: GamePlatform;
  /** Size classes, e.g. `h-11 w-[34px]`. */
  sizeClass: string;
  /** Band height class; the band shows the platform when there is no cover art. */
  bandClass: string;
};

/** Small portrait cover: IGDB art when there is one, a tinted block with the platform band if not. */
export function CoverThumb({ coverUrl, platform, sizeClass, bandClass }: CoverThumbProps) {
  return (
    <span
      aria-hidden="true"
      className={`relative block shrink-0 overflow-hidden rounded-xs bg-surface-hover ${sizeClass}`}
    >
      {coverUrl ? (
        <Image src={coverUrl} alt="" fill unoptimized sizes="52px" className="object-cover" />
      ) : (
        <span
          className={`absolute inset-x-0 top-0 block ${bandClass} band-${platform}`}
          title={PLATFORM_STYLES[platform].name}
        />
      )}
    </span>
  );
}
