const request = require("supertest");
const app = require("../app");
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
        expect(body.categories).toHaveLength(4);
        body.categories.forEach((category) => {
          expect(category).toHaveProperty("slug");
          expect(category).toHaveProperty("description");
        });
      });
  });
  test("Reviews should have properties of title, designer, review_body, review_id, review_img_url, votes, owner, created_at, category", () => {
    return request(app)
      .get("/api/reviews/5")
      .expect(200)
      .then(({ body }) => {
        expect(body.review.review_id).toBe(5);
        expect(body.review).toHaveProperty("title");
        expect(body.review).toHaveProperty("designer");
        expect(body.review).toHaveProperty("review_body");
        expect(body.review).toHaveProperty("review_id");
        expect(body.review).toHaveProperty("review_img_url");
        expect(body.review).toHaveProperty("votes");
        expect(body.review).toHaveProperty("category");
        expect(body.review).toHaveProperty("created_at");
        expect(body.review).toHaveProperty("owner");
      });
  });
  test("status:400, responds with an error message when passed a bad user ID", () => {
    return request(app)
      .get("/api/reviews/notAnID")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          'invalid input syntax for type integer: "notAnID"'
        );
      });
  });
  test("status:404, responds with an error message when path is invalid", () => {
    return request(app)
      .get("/api/r")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found");
      });
  });
  test("status:404, responds with an error message when passed unavailable ID", () => {
    return request(app)
      .get("/api/reviews/10000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No review found for review_id: 10000");
      });
  });
  test("Reviews should have properties of title, designer, review_body, review_id, review_img_url, votes, owner, created_at, category, comment_count", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews).toHaveLength(13);
        expect(body.reviews).toBeSortedBy("created_at", {
          descending: true,
          coerce: true,
        });
        body.reviews.forEach((review) => {
          expect(review).toHaveProperty("title");
          expect(review).toHaveProperty("designer");
          expect(review).toHaveProperty("review_body");
          expect(review).toHaveProperty("review_id");
          expect(review).toHaveProperty("review_img_url");
          expect(review).toHaveProperty("votes");
          expect(review).toHaveProperty("category");
          expect(review).toHaveProperty("created_at");
          expect(review).toHaveProperty("owner");
          expect(review).toHaveProperty("comment_count");
        });
      });
  });
  test("Search for Comments using review_id with properties of body, review_id, votes, comment_id, created_at, author", () => {
    return request(app)
      .get("/api/reviews/3/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments.length).toBe(3);
        body.comments.forEach((comment) => {
          expect(comment).toHaveProperty("author");
          expect(comment).toHaveProperty("comment_id");
          expect(comment).toHaveProperty("review_id");
          expect(comment).toHaveProperty("votes");
          expect(comment).toHaveProperty("created_at");
          expect(comment).toHaveProperty("body");
        });
      });
  });
  test("return empty array if there are no comments for chosen id", () => {
    return request(app)
      .get("/api/reviews/5/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments.length).toBe(0);
      });
  });
  test("status:400, responds with an error message when passed a bad user ID", () => {
    return request(app)
      .get("/api/reviews/notAnID/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          'invalid input syntax for type integer: "notAnID"'
        );
      });
  });
  test("status:404, responds with an error message when passed unavailable ID", () => {
    return request(app)
      .get("/api/reviews/10000/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No reviews found for review_id: 10000");
      });
  });
  test("Should delete specified comment and respond with 204 status", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
  test("status:400, responds with an error message when passed a bad user ID", () => {
    return request(app)
      .delete("/api/comments/notAnID")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe(
          'invalid input syntax for type integer: "notAnID"'
        );
      });
  });
  test("status:404, responds with an error message when passed unavailable ID", () => {
    return request(app)
      .delete("/api/comments/9999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No comments found for comment_id: 9999");
      });
  });
});
