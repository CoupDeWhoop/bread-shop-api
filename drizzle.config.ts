import { defineConfig } from "drizzle-kit";

const ENV = process.env.NODE_ENV || "development";
console.log(ENV);

require("dotenv").config({ path: `${__dirname}/.env.${ENV}` });

export default defineConfig({
  schema: "./src/app/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
