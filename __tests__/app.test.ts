import request from 'supertest';
import { Product } from '../src/schema/product.schema';
import app from '../src/app/app';
import { seed } from '../src/app/db/seeds/seed';
import * as model from '../src/app/models/app.model';

beforeEach(() => seed());
afterEach(() => jest.clearAllMocks());

describe('GET /api/products', () => {
    test('200 - responds with array of products data', async () => {
        const response = await request(app).get('/api/products').expect(200);
        const products: Product[] = response.body.products;
        expect(products).toHaveLength(3);
        products.forEach((product) => {
            expect(product).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
                description: expect.any(String),
                priceInPence: expect.any(Number),
                stock: expect.any(Number),
                imageUrl: expect.any(String),
            });
        });
    });

    test('should respond with 500 and an error message when the database call fails', async () => {
        jest.spyOn(model, 'fetchAllProducts').mockRejectedValueOnce(
            new Error('Database Error')
        );

        const response = await request(app).get('/api/products').expect(500);

        expect(response.body).toEqual({ message: 'Internal Server Error' });
    });
});

describe('POST /api/basket/items', () => {
    test('should post a new item to a new basket', async () => {
        const itemToAdd = {
            productId: 2,
            quantity: 1,
            userId: 'someUser',
        };

        const response = await request(app)
            .post('/api/basket/items')
            .send(itemToAdd)
            .expect(201);
        expect(response.body.item).toMatchObject({
            id: 1,
            basketId: 1,
            productId: 2,
            quantity: 1,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        });
    });

    test.only('should handle adding multiple items', async () => {
        const itemToAdd = {
            productId: 2,
            quantity: 1,
            userId: 'someUser',
        };

        const itemToAdd2 = {
            productId: 2,
            quantity: 1,
            userId: 'someUser',
        };

        const promises = [itemToAdd, itemToAdd2].map((item) =>
            request(app).post('/api/basket/items').send(item).expect(201)
        );

        const responses = await Promise.all(promises);

        expect(responses[1].body.item).toMatchObject({
            basketId: 1,
            productId: 2,
            quantity: 2,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        });
    });

    test('should return 400 for invalid quantity', async () => {
        const itemToAdd = {
            productId: 2,
            quantity: 0,
            userId: 'someUser',
        };

        const response = await request(app)
            .post('/api/basket/items')
            .send(itemToAdd)
            .expect(400);

        expect(response.body.error).toBe('Invalid or missing quantity');
    });

    test('should return 400 for invalid product id', async () => {
        const itemToAdd = {
            productId: '£$',
            quantity: 1,
            userId: 'someUser',
        };

        const response = await request(app)
            .post('/api/basket/items')
            .send(itemToAdd)
            .expect(400);

        expect(response.body.error).toBe('Invalid or missing product ID');
    });

    test('should return 400 for missing product id', async () => {
        const itemToAdd = {
            quantity: 1,
            userId: 'someUser',
        };

        const response = await request(app)
            .post('/api/basket/items')
            .send(itemToAdd)
            .expect(400);

        expect(response.body.error).toBe('Invalid or missing product ID');
    });

    test('should return 400 for missing user id', async () => {
        const itemToAdd = {
            productId: 2,
            quantity: 1,
        };

        const response = await request(app)
            .post('/api/basket/items')
            .send(itemToAdd)
            .expect(400);

        expect(response.body.error).toBe('Invalid or missing user ID');
    });
});
