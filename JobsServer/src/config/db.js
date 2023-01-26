require("dotenv").config();
const mongoose = require("mongoose");
const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    console.log(process.env.DB_URL);
    return mongoose.connect(process.env.DB_URL);
  } catch (er) {
    console.log("er from mongoose connection");
    return;
  }
};
module.exports = connect;
