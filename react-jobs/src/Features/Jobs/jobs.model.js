const mongoose = require("mongoose");
const file = {
  CompanyName: { type: String, require: true },
  Position: { type: String, require: true },
  Contract: { type: String, require: true },
  Location: { type: String, require: true },
};
const JobsSchema = new mongoose.Schema(file);
const JobsModel = mongoose.model("Job", JobsSchema);
module.exports = JobsModel;
