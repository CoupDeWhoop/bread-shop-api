import {
    pgTable,
    serial,
    text,
    varchar,
    integer,
    timestamp,
} from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description').notNull(),
    priceInPence: integer('price_in_pence').notNull(),
    stock: integer('stock').notNull(),
    imageUrl: varchar('image_url', { length: 2048 }),
});

export const baskets = pgTable('baskets', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const basketItems = pgTable('basket_items', {
    id: serial('id').primaryKey(),
    basketId: integer('basket_id')
        .references(() => baskets.id, { onDelete: 'cascade' })
        .notNull(),
    productId: integer('product_id')
        .references(() => products.id, { onDelete: 'cascade' })
        .notNull(),
    quantity: integer('quantity').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
