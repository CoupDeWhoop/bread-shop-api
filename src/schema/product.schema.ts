import { z } from 'zod';

export const ProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    priceInPence: z.number(),
    stock: z.number(),
    imageUrl: z.string().url(),
});

export type Product = z.infer<typeof ProductSchema>;

export const basketItems = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    priceInPence: z.number(),
    basketId: z.string().uuid(),
    productId: z.number(),
    quantity: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type BasketItems = z.infer<typeof basketItems>;
