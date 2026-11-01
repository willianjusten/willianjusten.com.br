import { createHmac } from "node:crypto";

/** Best-effort client IP from proxy headers; the first x-forwarded-for entry is the visitor. */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwardedFor || headers.get("x-real-ip")?.trim() || "unknown";
}

/** Keyed hash of an IP. The raw address is never stored or logged anywhere. */
export function hashIp(ip: string, secret = process.env.IP_HASH_SECRET): string {
  if (!secret) {
    throw new Error("IP_HASH_SECRET is not set");
  }
  return createHmac("sha256", secret).update(ip).digest("hex");
}
