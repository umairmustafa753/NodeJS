const express = require("express");
const { check } = require("express-validator");
const { getNote, createNote, removeNote } = require("../controller/note");
const { expressPostValidator } = require("../validator/note");

const Authorization = require("./../middleware/Authorization");
const api = express.Router();

api.get("/", Authorization, getNote);
api.post(
  "/note",
  Authorization,
  //For title err
  check("title").notEmpty().withMessage("Write a title"),
  check("title")
    .isLength({ min: 4, max: 150 })
    .withMessage("Title must be of 4 or 150 character"),
  //For Body err
  check("body").notEmpty().withMessage("Write a Body"),
  check("body")
    .isLength({ min: 4, max: 150 })
    .withMessage("Body must be of 4 or 150 character"),
  expressPostValidator,
  createNote
);

api.delete("/note/:id", Authorization, removeNote);

module.exports = api;
