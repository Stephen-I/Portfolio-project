const db = require("../db/connection");
const { reviews } = require("../db/data/development-data/index");

exports.seeReviewsById = (review_id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1", [review_id])
    .then(({ rows }) => rows[0]);
};
