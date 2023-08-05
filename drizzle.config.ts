import { Config } from "drizzle-kit";

export default {
  schema: "apps/abf1-web/lib/db/schema.ts",
  out: "apps/abf1-web/lib/db/migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
  verbose: true,
} satisfies Config;