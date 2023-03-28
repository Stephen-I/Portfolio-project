const express = require("express");
const app = express();

const {
  viewCategories,
  getMessage,
  viewReviewsById,
} = require("./controllers/app.controller");

app.use(express.json());

app.get("/api", getMessage);

app.get("/api/categories", viewCategories);

app.get("/api/reviews/:review_id", viewReviewsById);

app.get("/not-a-route");

app.use((err, req, res, next) => {
  if (err.code === 404) {
    res.status(404).send("Not found");
  }
});

module.exports = app;
