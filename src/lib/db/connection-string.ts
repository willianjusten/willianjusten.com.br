/**
 * Pasted connection strings can carry invisible terminal control characters (for example a
 * leading ESC from bracketed paste), which make the URL invalid. Strip them before use.
 */
export function cleanConnectionString(raw: string | undefined): string {
  // oxlint-disable-next-line no-control-regex
  return (raw ?? "").replace(/[\u0000-\u001f\u007f]/g, "").trim();
}

export function readConnectionString(raw = process.env.DATABASE_URL): string {
  const connectionString = cleanConnectionString(raw);
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  return connectionString;
}
