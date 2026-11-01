import { getDatabase } from "@/lib/db/client";
import { getClientIp, hashIp } from "@/lib/db/ip-hash";
import { checkRateLimit } from "@/lib/db/rate-limit";
import { createShotRoute } from "@/sections/nba/server/shot-route";
import { readShotTotals, recordShot } from "@/sections/nba/server/shot-stats";

export const dynamic = "force-dynamic";

const shotRoute = createShotRoute({
  hashClientIp: (headers) => hashIp(getClientIp(headers)),
  checkRateLimit: (ipHash, rule) => checkRateLimit(getDatabase(), ipHash, rule),
  recordShot: (made) => recordShot(getDatabase(), made),
  readTotals: () => readShotTotals(getDatabase()),
});

export const GET = shotRoute.GET;
export const POST = shotRoute.POST;
