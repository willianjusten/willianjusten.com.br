import { getDatabase } from "@/lib/db/client";
import { getClientIp, hashIp } from "@/lib/db/ip-hash";
import { checkRateLimit } from "@/lib/db/rate-limit";
import type { RateLimitGuardDependencies } from "./rate-limit-guard";

/** The production guard: hashes the visitor IP and counts hits in Postgres. Route files only. */
export const visitorRateLimitGuard: RateLimitGuardDependencies = {
  hashClientIp: (headers) => hashIp(getClientIp(headers)),
  checkRateLimit: (ipHash, rule) => checkRateLimit(getDatabase(), ipHash, rule),
};
