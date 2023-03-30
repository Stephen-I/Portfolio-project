const { seeCommentsById } = require("../models/comment.model");

exports.viewComments = (req, res, next) => {
  const { review_id } = req.params;
  seeCommentsById(review_id)
    .then((comment) => res.status(200).send({ comment }))
    .catch(next);
};
