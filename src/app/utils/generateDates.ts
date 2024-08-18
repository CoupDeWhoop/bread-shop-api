import { faker } from '@faker-js/faker';

export function generateTwoDates() {
    const createdAt = faker.date.recent();

    // Generate the second date (later date) after the earlier date
    const updatedAt = faker.date.between({ from: createdAt, to: Date.now() });

    return { createdAt, updatedAt };
}
