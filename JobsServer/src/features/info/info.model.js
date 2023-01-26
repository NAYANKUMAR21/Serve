const mongoose = require("mongoose");
const file = {
  appliedJob: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "job",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "auth",
  },
};
const info = new mongoose.Schema(file, { versionKey: false });
const infoModel = mongoose.model("info", info);
module.exports = infoModel;
