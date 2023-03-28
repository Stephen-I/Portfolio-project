const { seeCategories, seeReviews } = require("../modals/app.modal");

exports.getMessage = (req, res) => {
  res.status(200).send({ message: "all ok" });
};

exports.viewCategories = (req, res) => {
  seeCategories().then((categories) => {
    res.status(200).send({ categories });
  });
};

exports.viewReviews = (req, res) => {
  seeReviews().then((reviews) => {
    res.status(200).send({ reviews });
  });
};
