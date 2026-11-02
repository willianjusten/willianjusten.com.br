import Image from "next/image";
import { fillTemplate } from "@/lib/fill-template";
import type { AlbumPhoto } from "../lib/places-board";

type AlbumThumbnailsProps = {
  photos: AlbumPhoto[];
  currentIndex: number;
  labels: { thumbnails: string; showPhoto: string };
  onShowPhoto: (photoIndex: number) => void;
};

export function AlbumThumbnails({
  photos,
  currentIndex,
  labels,
  onShowPhoto,
}: AlbumThumbnailsProps) {
  return (
    <ul
      aria-label={labels.thumbnails}
      // One row that runs off the edge on phones, so the cut-off thumbnail shows there are more.
      className="-mx-4 -my-1 flex shrink-0 gap-1.5 overflow-x-auto px-4 py-1 sm:mx-0 sm:my-0 sm:py-0 sm:flex-wrap sm:overflow-visible sm:px-0"
    >
      {photos.map((thumbnail, thumbnailIndex) => {
        const isCurrent = thumbnailIndex === currentIndex;
        return (
          <li key={thumbnail.src} className="shrink-0">
            <button
              type="button"
              aria-label={fillTemplate(labels.showPhoto, {
                index: thumbnailIndex + 1,
                total: photos.length,
              })}
              aria-pressed={isCurrent}
              onClick={() => onShowPhoto(thumbnailIndex)}
              className={`relative block size-11 overflow-hidden rounded-xs border-2 bg-surface hover:outline-1 hover:outline-line-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                isCurrent ? "border-accent" : "border-transparent"
              }`}
            >
              <Image
                src={thumbnail.src}
                alt=""
                fill
                sizes="44px"
                placeholder="blur"
                blurDataURL={thumbnail.blurDataUrl}
                className="object-cover"
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
