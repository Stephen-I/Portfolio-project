const { seeCommentsById, removeComment } = require("../models/comment.model");

exports.viewComments = (req, res, next) => {
  const { review_id } = req.params;
  seeCommentsById(review_id)
    .then((comments) => res.status(200).send({ comments }))
    .catch(next);
};

exports.deleteComments = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id).then(() => {
    res.status(204);
  });
};
