import { pgTable, serial, text, varchar, integer } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  priceInPence: integer("price_in_pence").notNull(),
  stock: integer("stock").notNull(),
  imageUrl: varchar("image_url", { length: 2048 }),
});
