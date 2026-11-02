"use client";

/* The viewer is a modal region over the globe: keys page the photos and presses must not start a globe drag. */
/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions */

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, type KeyboardEvent, type PointerEvent } from "react";
import { useSwipe } from "../hooks/use-swipe";
import { fillTemplate } from "@/lib/fill-template";
import type { AlbumPhoto } from "../lib/places-board";
import { PhotoCaption } from "./photo-caption";
import { PhotoCounter } from "./photo-counter";

export type PhotoViewerLabels = {
  previous: string;
  next: string;
  closeViewer: string;
  counter: string;
};

type PhotoViewerProps = {
  photo: AlbumPhoto;
  photoIndex: number;
  total: number;
  /** Whether previous and next can reach another photo, possibly in another place. */
  canStep: boolean;
  labels: PhotoViewerLabels;
  onStep: (direction: 1 | -1) => void;
  onClose: () => void;
};

const SIDE_BUTTON_CLASS =
  "absolute top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-surface/80 text-text transition-colors hover:border-line-hover hover:bg-surface-hover";

export function PhotoViewer({
  photo,
  photoIndex,
  total,
  canStep,
  labels,
  onStep,
  onClose,
}: PhotoViewerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const swipe = useSwipe((direction) => {
    if (canStep) onStep(direction);
  });

  useEffect(() => {
    closeButtonRef.current?.focus({ preventScroll: true });
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    event.stopPropagation();
    if (event.key === "Escape") onClose();
    if (!canStep) return;
    if (event.key === "ArrowLeft") onStep(-1);
    if (event.key === "ArrowRight") onStep(1);
  };

  const onPointerDown = (event: PointerEvent<HTMLDialogElement>) => {
    event.stopPropagation();
    swipe.onPointerDown(event);
  };

  return (
    <dialog
      open
      aria-modal="true"
      aria-label={fillTemplate(labels.counter, { index: photoIndex + 1, total })}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={swipe.onPointerUp}
      className="absolute inset-0 z-400 m-0 flex size-full max-h-none max-w-none origin-top-right cursor-default flex-col bg-bg-sunken p-0 text-text motion-safe:animate-photo-expand"
    >
      <div className="flex items-center justify-between gap-3 p-3">
        <PhotoCounter photoIndex={photoIndex} total={total} label={labels.counter} />
        <button
          ref={closeButtonRef}
          type="button"
          aria-label={labels.closeViewer}
          onClick={onClose}
          className="flex size-11 items-center justify-center rounded-full border border-line-strong text-text-2 transition-colors hover:border-line-hover hover:text-text"
        >
          <X size={18} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <div className="relative mb-3 min-h-0 flex-auto">
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.line.title ?? ""}
          fill
          sizes="(min-width: 1200px) 1200px, 100vw"
          placeholder="blur"
          blurDataURL={photo.blurDataUrl}
          draggable={false}
          className="object-contain"
        />
        {canStep ? (
          <>
            <button
              type="button"
              aria-label={labels.previous}
              onClick={() => onStep(-1)}
              className={`${SIDE_BUTTON_CLASS} left-3`}
            >
              <ChevronLeft size={22} strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={labels.next}
              onClick={() => onStep(1)}
              className={`${SIDE_BUTTON_CLASS} right-3`}
            >
              <ChevronRight size={22} strokeWidth={2} aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>

      <PhotoCaption line={photo.line} className="px-4 pb-3 text-center" />
    </dialog>
  );
}
