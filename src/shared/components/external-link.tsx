import type { ComponentProps } from "react";

/** An anchor to another site: opens in a new tab without handing it `window.opener`. */
export function ExternalLink({ children, ...props }: Omit<ComponentProps<"a">, "target" | "rel">) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
