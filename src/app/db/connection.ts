import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, PoolConfig } from "pg";

const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `${__dirname}/../../../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config: PoolConfig = {};

// const pool = new Pool({
//   host: "127.0.0.1",
//   port: 5432,
//   user: "postgres",
//   password: "password",
//   database: "db_name",
// });
// const pool = new Pool({
//   connectionString: "postgres://user:password@host:port/db",
// });

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
}

const pool = new Pool(config);

export const db = drizzle(pool);
