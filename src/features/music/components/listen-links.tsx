import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import type { PlayableTrack } from "../lib/music-board";
import { ExternalLink } from "@/components/external-link";
import type { MusicLabels } from "./music-board";

type ListenLinksProps = {
  track: PlayableTrack;
  labels: MusicLabels;
};

export function ListenLinks({ track, labels }: ListenLinksProps) {
  const listenLinks = [
    { label: labels.youtubeMusic, href: track.youtubeMusicUrl },
    { label: labels.spotify, href: track.spotifyUrl },
    { label: labels.appleMusic, href: track.appleMusicUrl },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href));

  if (listenLinks.length === 0) return null;

  return (
    <nav
      aria-label={labels.listenOn}
      className="flex w-full flex-col gap-1 border-t border-line pt-3"
    >
      <span className="font-mono text-caption tracking-[0.08em] text-text-muted uppercase">
        {labels.listenOn}
      </span>
      <ul className="m-0 -ml-2 flex list-none flex-wrap p-0">
        {listenLinks.map((link) => (
          <li key={link.label}>
            <ExternalLink
              href={link.href}
              className="inline-flex min-h-11 items-center gap-1 px-2 text-small text-text-2 transition-colors hover:text-text"
            >
              {link.label}
              <ExternalLinkIcon size={11} aria-hidden="true" className="text-text-faint" />
            </ExternalLink>
          </li>
        ))}
      </ul>
      <p className="m-0 text-micro text-text-faint">{labels.credit}</p>
    </nav>
  );
}
