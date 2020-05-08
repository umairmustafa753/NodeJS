const express = require("express");
const { check } = require("express-validator");
const {
  getAllNotes,
  getUserNotes,
  createNote,
  removeNote,
  updateNote
} = require("../controller/note");
const { expressPostValidator } = require("../validator/note");

const Authorization = require("./../middleware/Authorization");
const api = express.Router();

api.get("/note", Authorization, getAllNotes);

api.get("/note/user/:id", Authorization, getUserNotes);

api.post(
  "/note",
  Authorization,
  check("title").notEmpty().withMessage("Write a title"),
  check("title")
    .isLength({ min: 4, max: 150 })
    .withMessage("Title must be of 4 or 150 character"),
  check("body").notEmpty().withMessage("Write a Body"),
  check("body")
    .isLength({ min: 4, max: 150 })
    .withMessage("Body must be of 4 or 150 character"),
  check("userid").notEmpty().withMessage("please give userid"),
  expressPostValidator,
  createNote
);

api.put(
  "/note",
  Authorization,
  check("title").notEmpty().withMessage("Write a title"),
  check("title")
    .isLength({ min: 4, max: 150 })
    .withMessage("Title must be of 4 or 150 character"),
  check("body").notEmpty().withMessage("Write a Body"),
  check("body")
    .isLength({ min: 4, max: 150 })
    .withMessage("Body must be of 4 or 150 character"),
  expressPostValidator,
  updateNote
);

api.delete("/note", Authorization, removeNote);

module.exports = api;
