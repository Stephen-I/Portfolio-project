const request = require("supertest");
const app = require("../db/testApp");
const db = require("../db/connection");
const {
  categories,
  comments,
  reviews,
  users,
} = require("../data/test-data/index");
