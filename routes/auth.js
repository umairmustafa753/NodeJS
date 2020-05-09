const { check } = require("express-validator");
const { expressPostValidator } = require("../validator/validate");

const express = require("express");
const Auth = require("../controller/auth");

const api = express.Router();

api.post(
  "/signup",
  check("firstName").notEmpty().withMessage("First name is required"),
  check("lastName").notEmpty().withMessage("Last name is required"),
  check("email").notEmpty().withMessage("Email is required"),
  check("email").isEmail().withMessage("Enter a valid email"),
  check("username").notEmpty().withMessage("Username is required"),
  check("password").notEmpty().withMessage("password is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be of 8 character or more"),
  expressPostValidator,
  Auth.Signup
);
api.post(
  "/signin",
  check("email").notEmpty().withMessage("Write a email"),
  check("password").notEmpty().withMessage("Write a password"),
  expressPostValidator,
  Auth.Login
);

module.exports = api;
