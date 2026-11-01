import Image from "next/image";
import type { PointerEvent } from "react";
import type { PinLayout } from "../lib/pin-layout";
import type { GlobePlace } from "../lib/places-board";

export type GlobePinElements = {
  pin: HTMLButtonElement;
  name: HTMLSpanElement;
  badge: HTMLSpanElement;
};

/**
 * Writes a frame's layout straight to the pin's DOM, skipping every value that did not change since
 * `previous`, so a still globe costs no style writes.
 */
export function writePinLayout(
  { pin, badge, name }: Partial<GlobePinElements>,
  layout: PinLayout,
  previous: PinLayout | undefined,
) {
  if (!pin) return;
  if (layout.transform !== previous?.transform) pin.style.transform = layout.transform;
  if (layout.zIndex !== previous?.zIndex) pin.style.zIndex = layout.zIndex;
  if (layout.opacity !== previous?.opacity) pin.style.opacity = layout.opacity;
  if (layout.isInteractive !== previous?.isInteractive) {
    pin.style.pointerEvents = layout.isInteractive ? "auto" : "none";
  }
  if (layout.isFocusable !== previous?.isFocusable) pin.tabIndex = layout.isFocusable ? 0 : -1;
  if (layout.ariaLabel !== previous?.ariaLabel) pin.setAttribute("aria-label", layout.ariaLabel);
  if (badge && layout.memberCount !== previous?.memberCount) {
    badge.style.display = layout.memberCount > 1 ? "flex" : "none";
    badge.textContent = String(layout.memberCount);
  }
  if (name && layout.showsName !== previous?.showsName) {
    name.style.display = layout.showsName ? "block" : "none";
  }
}

type GlobePinProps = {
  place: GlobePlace;
  isSelected: boolean;
  onMount: (slug: string, element: Partial<GlobePinElements>) => void;
  onActivate: () => void;
  onFocus: () => void;
  onPointerDown: (event: PointerEvent) => void;
};

export function GlobePin({
  place,
  isSelected,
  onMount,
  onActivate,
  onFocus,
  onPointerDown,
}: GlobePinProps) {
  const [cover] = place.photos;
  return (
    <button
      type="button"
      ref={(pin) => {
        if (pin) onMount(place.slug, { pin });
      }}
      aria-pressed={isSelected}
      onPointerDown={onPointerDown}
      onClick={onActivate}
      onFocus={onFocus}
      style={{ transformOrigin: "50% 100%" }}
      className="absolute top-0 left-0 flex flex-col items-center hover:brightness-125 focus-visible:outline-offset-4"
    >
      <span
        ref={(name) => {
          if (name) onMount(place.slug, { name });
        }}
        className="mb-1.5 hidden rounded-xs bg-bg/85 px-2 py-0.5 text-overline font-semibold whitespace-nowrap text-text"
      >
        {place.name}
      </span>
      <span className="relative">
        <span
          aria-hidden="true"
          style={{ backgroundColor: place.color }}
          className={`relative block overflow-hidden rounded-xs border-2 shadow-1 ${
            isSelected ? "h-11 w-15 border-accent" : "h-9 w-12 border-text"
          }`}
        >
          {cover ? (
            <Image
              src={cover.src}
              alt=""
              fill
              sizes="60px"
              placeholder="blur"
              blurDataURL={cover.blurDataUrl}
              className="object-cover"
            />
          ) : null}
        </span>
        <span
          ref={(badge) => {
            if (badge) onMount(place.slug, { badge });
          }}
          aria-hidden="true"
          className="absolute -top-2.5 -right-2.5 hidden h-5.5 min-w-5.5 items-center justify-center rounded-pill bg-accent px-1.5 font-mono text-overline font-medium text-on-accent"
        />
      </span>
      <span aria-hidden="true" className={`h-2.5 w-0.5 ${isSelected ? "bg-accent" : "bg-text"}`} />
      <span
        aria-hidden="true"
        className="-mt-px size-2 rounded-full bg-accent shadow-[0_0_0_3px_var(--bg),0_0_14px_var(--accent)]"
      />
    </button>
  );
}
