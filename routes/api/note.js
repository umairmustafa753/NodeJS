const express = require("express");
const { check } = require("express-validator");
const { getNote, createNote, removeNote } = require("../../controller/note");
const { expressPostValidator } = require("../../validator/note");
const api = express.Router();

api.get("/", getNote);
api.post(
  "/note",
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
  //For time err
  check("time").notEmpty().withMessage("not time is missing"),
  expressPostValidator,
  createNote
);

api.delete("/note/:id", removeNote);

module.exports = api;
