const db = require("../db/connection");
const { comments } = require("../db/data/development-data/index");

exports.seeCommentsById = (review_id) => {
  return db
    .query("SELECT * FROM comments WHERE review_id = $1", [review_id])
    .then(({ rows }) => {
      const comment = rows;
      return comment;
    });
};
