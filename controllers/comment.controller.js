const {
  seeCommentsById,
  addComment,
  removeComment,
} = require("../models/comment.model");
const { seeReviewsById } = require("../models/review.model");

exports.viewComments = (req, res, next) => {
  const { review_id } = req.params;
  seeCommentsById(review_id)
    .then((comments) => res.status(200).send({ comments }))
    .catch(next);
};

exports.insertComments = (req, res, next) => {
  const { review_id } = req.params;
  const { username: author, body } = req.body;
  seeReviewsById(review_id)
    .then(() => {
      return addComment(author, body, review_id);
    })
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.deleteComments = (req, res, next) => {
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
