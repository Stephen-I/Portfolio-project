const { seeCommentsById, addComment } = require("../models/comment.model");

exports.viewComments = (req, res, next) => {
  const { review_id } = req.params;
  seeCommentsById(review_id)
    .then((comments) => res.status(200).send({ comments }))
    .catch(next);
};

exports.insertComment = (req, res) => {
  const { username, body } = req.body;
  addComment(username, body).then((comment) =>
    res.status(201).send({
      comment,
      message: "comment added successfully",
    })
  );
};
