const mongoose = require("mongoose");
const connect = async () => {
  mongoose.set("strictQuery", true);
  return mongoose.connect("mongodb://localhost:27017/MOCK11");
};
module.exports = connect;
