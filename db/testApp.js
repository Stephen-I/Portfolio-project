const express = require("express");
const app = express();

const { viewCategories } = require("../controllers/testApp.controller");

app.use(express.json());

app.get("/api", getMessage);

app.get("/api/categories", viewCategories);

module.exports = app;
