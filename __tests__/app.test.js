const request = require("supertest");
const app = require("../db/app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const categories = require("../db/data/development-data/categories");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/app", () => {
  test("return request app", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.message).toEqual("all ok");
      });
  });
  test("return an array containing the contents of categories.js file", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body.categories)).toBe(true);
      });
  });
  test("Categories should have properties of slug and description", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        body.categories.forEach((category) => {
          expect(body.categories).toHaveLength(4);
          expect(category).toHaveProperty("slug");
          expect(category).toHaveProperty("description");
        });
      });
  });
  test("Reviews should have properties of title, designer, review_body, review_id, review_img_url, votes, owner, created_at, category", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        body.reviews.forEach((review) => {
          expect(body.reviews).toHaveLength(13);
          expect(review).toHaveProperty("title");
          expect(review).toHaveProperty("designer");
          expect(review).toHaveProperty("review_body");
          expect(review).toHaveProperty("review_id");
          expect(review).toHaveProperty("review_img_url");
          expect(review).toHaveProperty("votes");
          expect(review).toHaveProperty("category");
          expect(review).toHaveProperty("created_at");
          expect(review).toHaveProperty("owner");
        });
      });
  });
});
