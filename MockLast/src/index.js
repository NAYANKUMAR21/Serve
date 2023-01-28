require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./config/db");

const PORT = process.env.PORT || 8080;

//import middleware routes
const quizROuter = require("./Features/Quiz/quiz.router");
//middleeare
app.use(express.json());
app.use(cors());

//routes
app.use("/quiz", quizROuter);



//home page get request
app.get("/", (req, res) => {
  res.send("<h1>HOME PAGE GET ROUTE</h1>");
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
