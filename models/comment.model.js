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

exports.addComment = (username, body, review_id) => {
  return db
    .query(
      "INSERT INTO comments (author, body, review_id) VALUES ($1, $2, $3) RETURNING *;",
      [username, body, review_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
