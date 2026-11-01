"use client";

/* The panel is a focusable region: arrow keys page the photos and pointer presses must not start a globe drag. */
/* oxlint-disable jsx-a11y/no-noninteractive-element-interactions */

import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import type { KeyboardEvent, Ref } from "react";
import { ExternalLink } from "@/shared/components/external-link";
import { fillTemplate } from "@/shared/lib/fill-template";
import type { GlobePlace } from "../lib/places-board";
import { AlbumThumbnails } from "./album-thumbnails";

export type AlbumLabels = {
  label: string;
  home: string;
  previous: string;
  next: string;
  close: string;
  counter: string;
  thumbnails: string;
  showPhoto: string;
  moreFrom: string;
};

type AlbumPanelProps = {
  place: GlobePlace;
  photoIndex: number;
  labels: AlbumLabels;
  panelRef: Ref<HTMLElement>;
  onShowPhoto: (photoIndex: number) => void;
  onClose: () => void;
  /** Any press inside the panel; it never reaches the globe, so it would not start a drag. */
  onPress: () => void;
};

const OVERLAY_BUTTON_CLASS =
  "absolute top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-bg/70 text-text transition-colors hover:bg-bg";

/** Escape is handled by the globe frame. */
export function AlbumPanel({
  place,
  photoIndex,
  labels,
  panelRef,
  onShowPhoto,
  onClose,
  onPress,
}: AlbumPanelProps) {
  const { photos } = place;
  const photo = photos[photoIndex];
  const total = photos.length;
  const showPrevious = () => onShowPhoto((photoIndex - 1 + total) % total);
  const showNext = () => onShowPhoto((photoIndex + 1) % total);
  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowLeft") showPrevious();
    if (event.key === "ArrowRight") showNext();
  };

  return (
    <section
      ref={panelRef}
      tabIndex={-1}
      aria-label={fillTemplate(labels.label, { place: place.name })}
      onKeyDown={onKeyDown}
      onPointerDown={(event) => {
        event.stopPropagation();
        onPress();
      }}
      className="absolute top-3 right-3 bottom-3 z-300 flex w-[min(360px,calc(100%-24px))] cursor-default flex-col overflow-hidden rounded-md border border-line-strong bg-glass-strong shadow-2 backdrop-blur-md"
    >
      <div className="relative aspect-16/10 shrink-0 bg-surface">
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.line.title ?? fillTemplate(labels.counter, { index: photoIndex + 1, total })}
          fill
          sizes="360px"
          placeholder="blur"
          blurDataURL={photo.blurDataUrl}
          className="object-cover"
        />
        <p
          aria-live="polite"
          className="absolute top-2.5 right-2.5 rounded-pill bg-bg/70 px-2.5 py-0.5 font-mono text-overline text-text"
        >
          <span aria-hidden="true">
            {photoIndex + 1} / {total}
          </span>
          <span className="sr-only">
            {fillTemplate(labels.counter, { index: photoIndex + 1, total })}
          </span>
        </p>
        {total > 1 ? (
          <>
            <button
              type="button"
              aria-label={labels.previous}
              onClick={showPrevious}
              className={`${OVERLAY_BUTTON_CLASS} left-2`}
            >
              <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={labels.next}
              onClick={showNext}
              className={`${OVERLAY_BUTTON_CLASS} right-2`}
            >
              <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>

      <div className="flex min-h-0 flex-auto flex-col gap-2.5 overflow-auto px-4 pt-3.5 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="font-mono text-overline text-accent">
              {place.country} · {place.year ?? labels.home}
            </p>
            <h3 className="font-display text-h3 leading-[1.1] font-bold">{place.name}</h3>
          </div>
          <button
            type="button"
            aria-label={labels.close}
            onClick={onClose}
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-text-2 transition-colors hover:border-line-hover hover:text-text"
          >
            <X size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        {place.caption ? <p className="text-small text-text-2">{place.caption}</p> : null}

        {photo.line.title || photo.line.details ? (
          <p className="text-small text-text-2">
            {photo.line.title}
            {photo.line.details ? (
              <span className="font-mono text-overline text-text-muted">
                {photo.line.title ? " " : null}
                {photo.line.details}
              </span>
            ) : null}
          </p>
        ) : null}

        {total > 1 ? (
          <AlbumThumbnails
            photos={photos}
            currentIndex={photoIndex}
            labels={labels}
            onShowPhoto={onShowPhoto}
          />
        ) : null}

        <ExternalLink
          href={place.unsplashUrl}
          className="chip-link mt-auto inline-flex min-h-11 items-center gap-1.5 self-start text-eyebrow text-text-2 no-underline hover:text-text"
        >
          {fillTemplate(labels.moreFrom, { place: place.name })}
          <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" className="nudge-arrow" />
        </ExternalLink>
      </div>
    </section>
  );
}
