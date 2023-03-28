const db = require("../connection");
const {
  categories,
  comments,
  reviews,
  users,
} = require("../data/development-data/index");

exports.seeCategories = () => {
  return db.query("SELECT * FROM categories;").then(({ rows }) => rows);
};

exports.seeReviewsById = (review_id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1", [review_id])
    .then(({ rows }) => {
      const review = rows[0];
      if (!review) {
        return Promise.reject({
          status: 404,
          msg: `No review found for review_id: ${review_id}`,
        });
      }
      return review;
    });
};
