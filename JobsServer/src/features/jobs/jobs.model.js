const mongoose = require("mongoose");
const file = {
  CompanyName: { type: String, require: true },
  Position: { type: String, require: true },
  Contract: { type: String, require: true },
  Location: { type: String, require: true },
};
const jobSchema = new mongoose.Schema(file, { versionKey: false });
const jobModel = mongoose.model("job", jobSchema);
module.exports = jobModel;

