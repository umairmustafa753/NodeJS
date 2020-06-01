const express = require("express");
const app = express();
const cors = require("cors");
const noteRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

dotenv.config();

//db
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("database connected"));

mongoose.connection.on("error", (err) => {
  console.log("Database connection error message: " + err.message);
});

//middleware
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use("/api", cors(), noteRoutes);
app.use("/auth", cors(), authRoutes);
app.use("*", (req, res) => {
  res.send("Not Found!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("server is running on port: " + port));
