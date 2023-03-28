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

exports.seeReviews = () => {
  return db.query("SELECT * FROM reviews;").then(({ rows }) => rows);
};
