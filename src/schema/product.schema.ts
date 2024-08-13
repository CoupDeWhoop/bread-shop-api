import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  priceInPence: z.number(),
  stock: z.number(),
  imageUrl: z.string().url(), // Ensures it's a valid URL
});

// Infer the TypeScript type from the Zod schema
export type Product = z.infer<typeof ProductSchema>;
