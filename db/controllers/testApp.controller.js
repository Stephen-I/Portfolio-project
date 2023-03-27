const { seeCategories } = require("../modals/testApp.modal");

exports.getMessage = (req, res) => {
  res.status(200).send({ message: "all ok" });
};

exports.viewCategories = (req, res) => {
  seeCategories().then((restaurants) => {
    res.status(200).send({ restaurants });
  });
};
