require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./config/db");

const PORT = process.env.PORT || 8080;

const wordROuter = require("./word/word.router");
const allRouter = require("./word/all.router");
//middleeare
app.use(express.json());
app.use(cors());

//routes
app.use("/word", wordROuter);
app.use("/all", allRouter);

//home page get request
app.get("/", (req, res) => {
  res.send("<h1>HOME PAGE GET FOR KEYBOARD GAME ROUTE</h1>");
});

//server start
app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`http://localhost:${PORT}`);
  } catch (er) {
    console.log(er.message);
  }
});
