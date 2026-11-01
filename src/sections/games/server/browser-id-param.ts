import { z } from "zod";

/** The id the browser keeps in storage (see `lib/browser-id.ts`). */
export const browserIdSchema = z.uuid();

/** The `?browserId=` query value, or undefined when absent or malformed: the read is then anonymous. */
export function readBrowserIdParam(request: Request): string | undefined {
  const parsed = browserIdSchema.safeParse(new URL(request.url).searchParams.get("browserId"));
  return parsed.success ? parsed.data : undefined;
}
