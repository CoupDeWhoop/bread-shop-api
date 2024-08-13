import request from "supertest";
import { Product } from "../src/schema/product.schema";
import app from "../src/app/app";
import { seed } from "../src/app/db/seeds/seed";

// beforeEach(() => seed());

test("200 - responds with array of products data", async () => {
  await seed();
  const response = await request(app).get("/api/products").expect(200);
  const products: Product[] = response.body.products;
  expect(products).toHaveLength(3);
  // products.forEach((product) => {
  //   expect(product).toMatchObject({
  //     id: expect.any(Number),
  //     name: expect.any(String),
  //     description: expect.any(String),
  //     priceInPence: expect.any(Number),
  //     stock: expect.any(Number),
  //     imageUrl: expect.any(String),
  //   });
  // });
});
