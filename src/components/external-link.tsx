import type { ComponentProps } from "react";

export function ExternalLink({ children, ...props }: Omit<ComponentProps<"a">, "target" | "rel">) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
