const mongoose = require("mongoose");
const file = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
};
const userSchema = new mongoose.Schema(file);

const userModel = mongoose.model("auth", userSchema);

module.exports = userModel;
