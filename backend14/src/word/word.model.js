const mongoose = require("mongoose");
const file = {
  level: { type: String, require: true },
  score: { type: Number, require: true },
  username: { type: String, require: true, unique: true },
};
const wordSchema = new mongoose.Schema(file);
const wordModel = mongoose.model("player", wordSchema);
module.exports = wordModel;
