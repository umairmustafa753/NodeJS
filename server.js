const express = require("express");
const app = express();
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
app.use("/api", noteRoutes);
app.use("/auth", authRoutes);
app.use("*", (req, res) => {
  res.send("Not Found!");
});

const secret = process.env.JWT_SECRET;
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log("server is running on port: " + secret + " " + port)
);
