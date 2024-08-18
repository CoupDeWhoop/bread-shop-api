import { UUID } from 'crypto';
import { db } from '../db/connection';
import { products, basketItems, baskets } from '../db/schema';
import { eq, and } from 'drizzle-orm';

export async function fetchAllProducts() {
    return await db.select().from(products);
}
type Basket = typeof baskets.$inferSelect;
type BasketParams = {
    basketId: UUID;
    productId: number;
    quantity: number;
};
export async function insertItemInBasket({
    basketId,
    productId,
    quantity,
}: BasketParams) {
    let basket: Basket[] | undefined;

    const existingBasket = await db
        .select()
        .from(baskets)
        .where(eq(baskets.id, basketId));

    if (existingBasket.length > 0) {
        basket = existingBasket;
    } else {
        basket = await db
            .insert(baskets)
            .values({
                id: basketId,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning();
    }

    const existingItem = await db
        .select({
            itemId: basketItems.id,
            basketId: baskets.id,
            productId: basketItems.productId,
            quantity: basketItems.quantity,
        })
        .from(baskets)
        .innerJoin(basketItems, eq(baskets.id, basketItems.basketId))
        .where(
            and(
                eq(basketItems.productId, productId),
                eq(basketItems.basketId, basketId)
            )
        );

    if (existingItem.length > 0) {
        return await db
            .update(basketItems)
            .set({
                quantity: existingItem[0].quantity + quantity,
                updatedAt: new Date(),
            })
            .where(
                and(
                    eq(basketItems.id, existingItem[0].itemId),
                    eq(basketItems.basketId, existingItem[0].basketId)
                )
            )
            .returning();
    } else {
        return await db
            .insert(basketItems)
            .values({
                productId,
                basketId: basket[0].id,
                quantity,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning();
    }
}

export async function fetchBasket(basketId: UUID) {
    const basket = await db
        .select()
        .from(basketItems)
        .where(eq(basketItems.basketId, basketId));
    return basket;
}
