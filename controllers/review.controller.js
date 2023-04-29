const {
  seeReviewsById,
  groupReviewsAndComments,
} = require("../models/review.model");

exports.viewReviewsById = (req, res, next) => {
  const { review_id } = req.params;
  seeReviewsById(review_id)
    .then((review) => res.status(200).send({ review }))
    .catch(next);
};

exports.notFoundErr = (req, res, next) => {
  res.status(404).send({ msg: "Path not found" });
};

exports.fetchReviews = (req, res, next) => {
  const { category } = req.query;
  groupReviewsAndComments(category)
    .then((reviews) => res.status(200).send({ reviews }))
    .catch(next);
};
