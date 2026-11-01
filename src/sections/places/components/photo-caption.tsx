import type { AlbumPhoto } from "../lib/places-board";

export function PhotoCaption({
  line,
  className = "",
}: Pick<AlbumPhoto, "line"> & { className?: string }) {
  if (!line.title && !line.details) return null;
  return (
    <p className={`text-small text-text-2 ${className}`}>
      {line.title}
      {line.details ? (
        <span className="font-mono text-overline text-text-muted">
          {line.title ? " " : null}
          {line.details}
        </span>
      ) : null}
    </p>
  );
}
