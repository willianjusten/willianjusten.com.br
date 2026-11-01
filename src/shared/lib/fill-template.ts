/** Fills `{name}` placeholders in a raw message, e.g. `"{index} of {total}"`. Unknown names stay as written. */
export function fillTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
    name in values ? String(values[name]) : placeholder,
  );
}
