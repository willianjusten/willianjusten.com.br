type BasketballIconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
};

/** Lucide has no basketball, so this one is drawn in the same 24px stroke style. */
export function BasketballIcon({ size = 20, strokeWidth = 1.8, className }: BasketballIconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v20M2 12h20M4.9 4.9c3.1 3.1 3.1 11.1 0 14.2M19.1 4.9c-3.1 3.1-3.1 11.1 0 14.2" />
    </svg>
  );
}
