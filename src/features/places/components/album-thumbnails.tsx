import Image from "next/image";
import { fillTemplate } from "@/shared/lib/fill-template";
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
    <ul aria-label={labels.thumbnails} className="flex flex-wrap gap-1.5">
      {photos.map((thumbnail, thumbnailIndex) => {
        const isCurrent = thumbnailIndex === currentIndex;
        return (
          <li key={thumbnail.src}>
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
