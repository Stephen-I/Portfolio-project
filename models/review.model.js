const db = require("../db/connection");
const { reviews } = require("../db/data/development-data/index");

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

exports.groupReviewsAndComments = () => {
  return db
    .query(
      "SELECT reviews.*, COUNT(reviews.review_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id GROUP BY reviews.review_id;"
    )
    .then(({ rows }) => rows);
};

exports.modifyReview = () => {};
