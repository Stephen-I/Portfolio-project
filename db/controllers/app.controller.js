const { seeCategories, seeReviewsById } = require("../modals/app.modal");

exports.getMessage = (req, res) => {
  res.status(200).send({ message: "all ok" });
};

exports.viewCategories = (req, res) => {
  seeCategories().then((categories) => {
    res.status(200).send({ categories });
  });
};

exports.viewReviewsById = (req, res, next) => {
  const { review_id } = req.params;
  seeReviewsById(review_id)
    .then((review) => res.status(200).send({ review }))
    .catch(next);
};
