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

exports.addComment = (username, body) => {
  return db
    .query("INSERT INTO comments (author, body) VALUES ($1, $2) RETURNING *;", [
      username,
      body,
    ])
    .then(({ rows }) => {
      rows[0];
      console.log(rows);
    });
};
