import { visitorRateLimitGuard } from "@/lib/api/visitor-rate-limit";
import { getDatabase } from "@/lib/db/client";
import { createShotRoute } from "@/features/nba/server/shot-route";
import { readShotTotals, recordShot } from "@/features/nba/server/shot-stats";

export const dynamic = "force-dynamic";

const shotRoute = createShotRoute({
  ...visitorRateLimitGuard,
  recordShot: (made) => recordShot(getDatabase(), made),
  readTotals: () => readShotTotals(getDatabase()),
});

export const GET = shotRoute.GET;
export const POST = shotRoute.POST;
