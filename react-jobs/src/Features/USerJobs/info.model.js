const mongoose = require("mongoose");
const file = {
  Jobs: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Job",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Auth",
  },
};
const InfoSchema = new mongoose.Schema(file);
const InfoModel = mongoose.model("info", InfoSchema);
module.exports = InfoModel;
