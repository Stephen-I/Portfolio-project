const db = require("../db/connection");
const {
  categories,
  comments,
  users,
} = require("../db/data/development-data/index");

exports.seeCategories = () => {
  return db.query("SELECT * FROM categories;").then(({ rows }) => rows);
};
