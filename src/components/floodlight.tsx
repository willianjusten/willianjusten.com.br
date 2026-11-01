export function Floodlight({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-1 rounded-full blur-[90px] ${className}`}
    />
  );
}
