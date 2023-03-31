const { seeCommentsById, addComment } = require("../models/comment.model");

exports.viewComments = (req, res, next) => {
  const { review_id } = req.params;
  seeCommentsById(review_id)
    .then((comments) => res.status(200).send({ comments }))
    .catch(next);
};

exports.insertComments = (req, res, next) => {
  const { review_id } = req.params;
  const { author, body } = req.body;
  addComment(author, body, review_id).then((comment) => {
    res.status(201).send({ comment });
  });
};
