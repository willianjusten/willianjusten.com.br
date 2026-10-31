import type { z } from "zod";

export type ContentModule<Schema extends z.ZodType = z.ZodType> = {
  name: string;
  schema: Schema;
  data: z.input<Schema>;
};

export function defineContentModule<Schema extends z.ZodType>(
  contentModule: ContentModule<Schema>,
): ContentModule<Schema> {
  return contentModule;
}

/** Add each typed content module here; the registry test parses all of them. */
export const contentModules: readonly ContentModule[] = [];
