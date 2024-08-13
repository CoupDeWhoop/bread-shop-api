import { db } from "../connection";
import { products } from "../schema";
import { productData } from "../data/seedData";

export async function seed() {
  if (process.env.NODE_ENV !== "test") console.log("Seeding...");

  try {
    await db.delete(products);
    await db.insert(products).values(productData).returning();
  } catch (error) {
    console.error("Seeding failed:", error);
  }
  if (process.env.NODE_ENV !== "test") console.log("seeded successfully");
}
