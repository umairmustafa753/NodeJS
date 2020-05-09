const express = require("express");
const { check } = require("express-validator");
const { expressPostValidator } = require("../validator/validate");

const Authorization = require("./../middleware/Authorization");
const Note = require("../controller/note");
const User = require("../controller/user");

const api = express.Router();

// note api
api.get("/note", Authorization, Note.getAllNotes);
api.get("/user/note/:email", Authorization, Note.getUserNotes);
api.post(
  "/note",
  Authorization,
  check("title").notEmpty().withMessage("title is required"),
  check("body").notEmpty().withMessage("Body is required"),
  check("userid").notEmpty().withMessage("please give userid"),
  expressPostValidator,
  Note.createNote
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
  Note.updateNote
);
api.delete("/note/:id", Authorization, Note.removeNote);

//user api
api.get("/users", Authorization, User.GetUsers);
api.delete("/users/:id", Authorization, User.removeUser);

module.exports = api;
