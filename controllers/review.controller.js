const { seeReviewsById } = require("../models/review.model");

exports.viewReviewsById = (req, res, next) => {
  const { review_id } = req.params;
  seeReviewsById(review_id)
    .then((review) => res.status(200).send({ review }))
    .catch(next);
};

exports.notFoundErr = (req, res, next) => {
  res.status(404).send({ msg: "Query not found" });
};
