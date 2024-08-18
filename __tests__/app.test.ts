import request from 'supertest';
import { Product } from '../src/schema/product.schema';
import app from '../src/app/app';
import { seed } from '../src/app/db/seeds/seed';
import * as model from '../src/app/models/app.model';
import { testBasket } from '../src/app/db/data/seedData';
const MOCK_UUID = '123e4567-e89b-12d3-a456-426614174000';

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
    const agent = request.agent(app);
    test('should save cookies', function (done) {
        agent
            .get('/api/products')
            .expect(
                'set-cookie',
                `basketId=${MOCK_UUID}; Path=/; HttpOnly`,
                done
            );
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
        };

        const response = await request(app)
            .post('/api/basket/items')
            .send(itemToAdd)
            .expect(201);
        expect(response.body.item).toMatchObject({
            id: expect.any(Number),
            basketId: expect.any(String),
            productId: 2,
            quantity: 1,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        });
    });

    const agent = request.agent(app);
    test('should add second request to same basket', async () => {
        const itemToAdd = {
            productId: 2,
            quantity: 1,
        };

        const itemToAdd2 = {
            productId: 2,
            quantity: 1,
        };

        const response1 = await agent
            .post('/api/basket/items')
            .send(itemToAdd)
            .expect(201);

        const response2 = await agent
            .post('/api/basket/items')
            .send(itemToAdd2)
            .expect(201);

        const basketId1 = response1.body.item.basketId;
        const basketId2 = response2.body.item.basketId;
        expect(basketId1).toEqual(basketId2);
        expect(response2.body.item).toMatchObject({
            basketId: expect.any(String),
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
        };

        const response = await request(app)
            .post('/api/basket/items')
            .send(itemToAdd)
            .expect(400);

        expect(response.body.error).toBe('Invalid or missing product ID');
    });
});

describe('GET /api/basket', () => {
    test('200 - responds with the items in the basket', async () => {
        const response = await request(app)
            .get('/api/basket/')
            .set('Cookie', `basketId=${testBasket}`)
            .expect(200);
        const { basket } = response.body;
        basket.forEach((product: Product) => {
            expect(product).toMatchObject({
                basketId: testBasket,
                productId: expect.any(Number),
                quantity: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            });
        });
    });
});
