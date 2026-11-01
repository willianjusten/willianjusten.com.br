"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, type KeyboardEvent, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import { fillTemplate } from "@/shared/lib/fill-template";
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
  labels: PhotoViewerLabels;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
};

const SWIPE_THRESHOLD_IN_PIXELS = 50;

const SIDE_BUTTON_CLASS =
  "absolute top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-bg/70 text-text transition-colors hover:bg-bg";

/**
 * Rendered into the body so the globe's touch and selection rules do not reach it. React still
 * bubbles its events to the globe, so keys and presses stop here.
 */
export function PhotoViewer({
  photo,
  photoIndex,
  total,
  labels,
  onPrevious,
  onNext,
  onClose,
}: PhotoViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const swipeStartXRef = useRef<number | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const rootStyle = document.documentElement.style;
    const previousOverflow = rootStyle.overflow;
    rootStyle.overflow = "hidden";
    dialog?.showModal();
    return () => {
      rootStyle.overflow = previousOverflow;
      dialog?.close();
    };
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    event.stopPropagation();
    if (total < 2) return;
    if (event.key === "ArrowLeft") onPrevious();
    if (event.key === "ArrowRight") onNext();
  };

  const onPointerDown = (event: PointerEvent<HTMLDialogElement>) => {
    event.stopPropagation();
    swipeStartXRef.current = event.clientX;
  };

  const onPointerUp = (event: PointerEvent<HTMLDialogElement>) => {
    const startX = swipeStartXRef.current;
    swipeStartXRef.current = null;
    if (startX === null || total < 2) return;
    const distance = event.clientX - startX;
    if (distance > SWIPE_THRESHOLD_IN_PIXELS) onPrevious();
    if (distance < -SWIPE_THRESHOLD_IN_PIXELS) onNext();
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-label={fillTemplate(labels.counter, { index: photoIndex + 1, total })}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      className="m-0 size-full open:flex max-h-none max-w-none flex-col bg-bg p-0 text-text backdrop:bg-bg"
    >
      <div className="flex items-center justify-between gap-3 p-3">
        <PhotoCounter photoIndex={photoIndex} total={total} label={labels.counter} />
        <button
          type="button"
          aria-label={labels.closeViewer}
          onClick={onClose}
          className="flex size-11 items-center justify-center rounded-full border border-line-strong text-text-2 transition-colors hover:border-line-hover hover:text-text"
        >
          <X size={18} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <div className="relative mb-3 min-h-0 flex-auto touch-pan-y">
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.line.title ?? ""}
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={photo.blurDataUrl}
          className="object-contain select-none"
          draggable={false}
        />
        {total > 1 ? (
          <>
            <button
              type="button"
              aria-label={labels.previous}
              onClick={onPrevious}
              className={`${SIDE_BUTTON_CLASS} left-3`}
            >
              <ChevronLeft size={22} strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={labels.next}
              onClick={onNext}
              className={`${SIDE_BUTTON_CLASS} right-3`}
            >
              <ChevronRight size={22} strokeWidth={2} aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>

      <PhotoCaption line={photo.line} className="min-h-11 px-4 py-3 text-center" />
    </dialog>,
    document.body,
  );
}
