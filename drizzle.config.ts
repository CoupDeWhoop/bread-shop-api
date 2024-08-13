import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

const ENV = process.env.NODE_ENV || "development";
config({ path: `.env.${ENV}` });
export default defineConfig({
  schema: "./src/app/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
