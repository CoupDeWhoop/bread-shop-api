import { db } from "../connection";
import { products } from "../schema";
import { productData } from "../data/seedData";

export async function seed() {
  console.log("Seeding...");
  try {
    // Clear existing data
    await db.delete(products);

    // Insert new data
    await db.insert(products).values(productData).returning();

    console.log("Database seeded successfully.");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

seed();
