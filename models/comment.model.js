const db = require("../db/connection");
const { comments } = require("../db/data/development-data/index");

exports.seeCommentsById = (review_id) => {
  return db
    .query("SELECT * FROM comments WHERE review_id = $1", [review_id])
    .then(({ rows }) => {
      const comment = rows[0];
      if (!comment) {
        return Promise.reject({
          status: 404,
          msg: `No comment found for review_id: ${review_id}`,
        });
      }
      return comment;
    });
};
