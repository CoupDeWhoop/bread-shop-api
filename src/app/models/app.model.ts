import { db } from '../db/connection';
import { products, basketItems, baskets } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function fetchAllProducts() {
    return await db.select().from(products);
}
type Basket = typeof baskets.$inferSelect;
type BasketParams = {
    userId: string;
    productId: number;
    quantity: number;
};
export async function insertItemInBasket({
    userId,
    productId,
    quantity,
}: BasketParams) {
    let basket: Basket[] | undefined;

    const existingBasket = await db
        .select()
        .from(baskets)
        .where(eq(baskets.userId, userId));

    if (existingBasket.length > 0) {
        basket = existingBasket;
    } else {
        basket = await db
            .insert(baskets)
            .values({
                userId,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning();
    }

    const existingItem = await db
        .select({
            itemId: basketItems.id,
            basketId: baskets.id,
            userId: baskets.userId,
            productId: basketItems.productId,
            quantity: basketItems.quantity,
        })
        .from(baskets)
        .innerJoin(basketItems, eq(baskets.id, basketItems.basketId))
        .where(eq(basketItems.productId, productId));

    if (existingItem.length > 0) {
        return await db
            .update(basketItems)
            .set({
                quantity: existingItem[0].quantity + quantity,
                updatedAt: new Date(),
            })
            .where(eq(basketItems.id, existingItem[0].itemId));
    } else {
        return await db.insert(basketItems).values({
            productId,
            basketId: basket[0].id,
            quantity,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
}
