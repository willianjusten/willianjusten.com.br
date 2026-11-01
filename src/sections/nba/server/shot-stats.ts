import { sql } from "drizzle-orm";
import type { Database } from "@/lib/db/client";
import { nbaShotStats } from "@/lib/db/schema";

export type ShotTotals = { shots: number; makes: number };

const TOTALS_ROW_ID = 1;

export async function recordShot(database: Database, made: boolean): Promise<ShotTotals> {
  const makeIncrement = made ? 1 : 0;
  const [row] = await database
    .insert(nbaShotStats)
    .values({ id: TOTALS_ROW_ID, shots: 1, makes: makeIncrement })
    .onConflictDoUpdate({
      target: nbaShotStats.id,
      set: {
        shots: sql`${nbaShotStats.shots} + 1`,
        makes: sql`${nbaShotStats.makes} + ${makeIncrement}`,
      },
    })
    .returning({ shots: nbaShotStats.shots, makes: nbaShotStats.makes });
  return row;
}

export async function readShotTotals(database: Database): Promise<ShotTotals> {
  const [row] = await database
    .select({ shots: nbaShotStats.shots, makes: nbaShotStats.makes })
    .from(nbaShotStats)
    .limit(1);
  return row ?? { shots: 0, makes: 0 };
}
