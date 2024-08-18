import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { generateTwoDates } from '../../utils/generateDates';

export const productData = [
    {
        id: 1,
        name: 'Sample Bread',
        description: 'Delicious whole grain bread',
        priceInPence: 399,
        stock: 100,
        imageUrl: 'http://example.com/sample-bread.jpg',
    },
    {
        id: 2,
        name: 'Chocolate Croissant',
        description: 'Flaky and sweet with chocolate filling',
        priceInPence: 249,
        stock: 50,
        imageUrl: 'http://example.com/chocolate-croissant.jpg',
    },
    {
        id: 3,
        name: 'Rye Bread',
        description: 'Authentic rye bread with a rich flavor',
        priceInPence: 449,
        stock: 30,
        imageUrl: 'http://example.com/rye-bread.jpg',
    },
];

export const testBasket = 'e460f07b-b983-4aae-bde2-5595cd982041';
const basket2 = faker.string.uuid();
const basket3 = faker.string.uuid();

export const basketData = [
    {
        id: testBasket, // generated
        ...generateTwoDates(),
    },
    {
        id: basket2, // generated
        ...generateTwoDates,
    },
    {
        id: basket3, // generated
        ...generateTwoDates,
    },
];

export const basketItemsData = [
    {
        basketId: testBasket,
        productId: 1,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        basketId: testBasket,
        productId: 2,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        basketId: basket2,
        productId: 1,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        basketId: basket2,
        productId: 1,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        basketId: basket3,
        productId: 2,
        quantity: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        basketId: basket2,
        productId: 3,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
