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

exports.groupReviewsAndComments = (category, sort_by) => {
  const queryValues = ["category", "votes", "created_at"];
  const queryArr = [];
  let queryStr =
    "SELECT reviews.*, COUNT(reviews.review_id) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id";
  if (category) {
    queryArr.push(category);
    queryStr += ` WHERE category = $1`;
  }

  queryStr += " GROUP BY reviews.review_id";

  if (queryValues.includes(sort_by)) {
    queryStr += ` ORDER BY ${sort_by} DESC`;
  }

  return db.query(queryStr, queryArr).then(({ rows }) => rows);
};

// exports.reviewsByQuery = () => {
//   const queryValues = [];
//   let queryStr = "SELECT * FROM table_name";

//   if (reviews.category) {
//     queryValues.push(reviews.category);
//     queryStr += ` WHERE column_name = $1`;
//   }
// };
