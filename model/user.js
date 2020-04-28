const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: ["S", "A", "SA"], default: "S" },
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, minlength: 6, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
