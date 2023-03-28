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
    .then(({ rows }) => rows[0]);
};
