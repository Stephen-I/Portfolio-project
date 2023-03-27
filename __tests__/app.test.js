const request = require("supertest");
const app = require("../db/app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));

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
        expect(body.categories[0]).toHaveProperty("slug");
        expect(body.categories[0]).toHaveProperty("description");
      });
  });
});
