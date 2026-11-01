"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

/** Mirrors `--breakpoint-nav` in src/styles/tokens.css. */
const DESKTOP_BREAKPOINT_QUERY = "(min-width: 900px)";

type MobileMenuProps = {
  links: ReadonlyArray<{ href: string; label: string }>;
  navigationLabel: string;
  openLabel: string;
  closeLabel: string;
};

/** Burger button and dropdown panel holding the section links below 900px. */
export function MobileMenu({ links, navigationLabel, openLabel, closeLabel }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      toggleButtonRef.current?.focus();
    }

    const desktopQuery = window.matchMedia(DESKTOP_BREAKPOINT_QUERY);
    function closeOnDesktop(event: MediaQueryListEvent) {
      if (event.matches) setIsOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      desktopQuery.removeEventListener("change", closeOnDesktop);
    };
  }, [isOpen]);

  return (
    <div className="nav:hidden">
      <button
        ref={toggleButtonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? closeLabel : openLabel}
        onClick={() => setIsOpen((wasOpen) => !wasOpen)}
        className="inline-flex size-9 items-center justify-center rounded-pill sm:size-11 border border-line-strong bg-(--glass-chip) text-text transition-colors hover:border-line-hover"
      >
        {isOpen ? (
          <X size={18} strokeWidth={1.8} aria-hidden="true" />
        ) : (
          <Menu size={18} strokeWidth={1.8} aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <nav
          id={panelId}
          aria-label={navigationLabel}
          className="mobile-menu-panel absolute inset-x-4 top-full mt-2 rounded-xl border border-line-strong bg-(--glass) p-2 shadow-2 backdrop-blur-lg"
        >
          <ul className="flex flex-col">
            {links.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="flex min-h-12 items-center rounded-md px-4 font-display text-[22px] font-bold text-text no-underline transition-colors hover:bg-surface-hover"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
