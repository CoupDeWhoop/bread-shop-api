import { db, Db } from '../connection';
import { basketItems, baskets, products } from '../schema';
import { productData } from '../data/seedData';
import { Table, getTableName, sql } from 'drizzle-orm';

async function resetTable(db: Db, table: Table) {
    return db.execute(
        sql.raw(
            `TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`
        )
    );
}
export async function seed() {
    console.log('Seeding...');

    try {
        await resetTable(db, basketItems);
        await resetTable(db, baskets);
        await resetTable(db, products);
        await db.insert(products).values(productData).returning();
    } catch (error) {
        console.error('Seeding failed:', error);
    }
    if (process.env.NODE_ENV !== 'test') console.log('seeded successfully');
}
