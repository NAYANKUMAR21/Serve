require("dotenv").config();
const express = require("express");
const app = express();
const connect = require("./config/db");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const authRouter = require("./features/auth/auth.router");
const JobRouter = require("./Features/Jobs/jobs.router");
const infoRouter = require("./Features/USerJobs/info.router");
//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/user", authRouter);
app.use("/jobs", JobRouter);
app.use("/info", infoRouter);

//homepage route
app.get("/", (req, res) => {
  res.send("this is home page of get route");
});

//starting Server
app.listen(PORT, async () => {
  try {
    console.log(PORT);
    await connect();
    console.log(`listeing http://localhost:${PORT}`);
  } catch (er) {
    console.log(er.message);
  }
});
