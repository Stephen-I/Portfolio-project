const { seeCategories } = require("../models/category.model");

exports.getMessage = (req, res) => {
  res.status(200).send({ message: "all ok" });
};

exports.viewCategories = (req, res) => {
  seeCategories().then((categories) => {
    res.status(200).send({ categories });
  });
};
