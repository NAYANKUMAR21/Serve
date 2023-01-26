const mongoose = require("mongoose");
const file = {
  name: { type: String },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
};
const authSchema = new mongoose.Schema(file, { versionKey: false });
const authModel = mongoose.model("auth", authSchema);
module.exports = authModel;
