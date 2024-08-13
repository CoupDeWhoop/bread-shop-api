import { db } from "../db/connection";
import { products } from "../db/schema";

export async function fetchAllProducts() {
  return await db.select().from(products);
}
