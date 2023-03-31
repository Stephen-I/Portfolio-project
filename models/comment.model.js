const db = require("../db/connection");
const { comments } = require("../db/data/development-data/index");

exports.seeCommentsById = (review_id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1", [review_id])
    .then(({ rows }) => rows)
    .then((rows) => {
      if (!rows[0]) {
        return Promise.reject({
          status: 404,
          msg: `No reviews found for review_id: ${review_id}`,
        });
      }

      return db.query("SELECT * FROM comments WHERE review_id = $1", [
        review_id,
      ]);
    })
    .then(({ rows }) => {
      const comment = rows;
      return comment;
    });
};

exports.removeComment = (comment_id) => {
  return db
    .query("SELECT * FROM comments WHERE comment_id = $1", [comment_id])
    .then(({ rows }) => rows)
    .then((rows) => {
      if (!rows[0]) {
        return Promise.reject({
          status: 404,
          msg: `No comments found for comment_id: ${comment_id}`,
        });
      }

      return db.query(
        `DELETE FROM comments WHERE comment_id = $1 RETURNING *`,
        [comment_id]
      );
    });
};
