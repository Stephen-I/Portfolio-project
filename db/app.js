const express = require("express");
const app = express();

const { viewCategories, getMessage } = require("./controllers/app.controller");

app.use(express.json());

app.get("/api", getMessage);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(404).send("Not found");
});

app.get("/api/categories", viewCategories);

module.exports = app;
