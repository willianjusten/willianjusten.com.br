import { defineConfig } from "drizzle-kit";
import { cleanConnectionString } from "./src/lib/db/connection-string";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url: cleanConnectionString(process.env.DATABASE_URL) },
});
