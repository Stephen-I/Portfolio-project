const express = require("express");
const app = express();

const {
  viewCategories,
  getMessage,
  viewReviews,
} = require("./controllers/app.controller");

app.use(express.json());

app.get("/api", getMessage);

app.get("/not-a-route");

app.use((err, req, res, next) => {
  console.log(err);
  res.status(404).send("Not found");
});

app.get("/api/categories", viewCategories);

app.get("/api/reviews/:review_id", viewReviews);

module.exports = app;
