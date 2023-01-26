require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./config/db");

const PORT = process.env.PORT || 8080;

//import middleware
const authRouter = require("./features/auth/auth.router");
const jobRouter = require("./features/jobs/jobs.router");
const infoRouter = require("./features/info/info.router");

//middleeare
app.use(express.json());
app.use(cors());

//routes
app.use("/auth", authRouter);
app.use("/job", jobRouter);
app.use("/info", infoRouter);

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
