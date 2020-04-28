const express = require("express");
const Auth = require("../controller/auth");

const api = express.Router();

api.post("/signup", Auth.Signup);
api.post("/signin", Auth.Login);

module.exports = api;
