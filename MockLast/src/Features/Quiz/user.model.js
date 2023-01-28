const mongoose = require("mongoose");
const file = {
  name: { type: String },
  level: { type: String, enum: ["easy", "medium", "hard"] },
  score: { type: Number },
};
const ansSchema = new mongoose.Schema(file, { versionKey: false });
const ansModel = mongoose.model("scoreBoard", ansSchema);
module.exports = ansModel;
