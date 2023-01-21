require("dotenv").config();
const express = require("express");
const app = express();
const connect = require("./config/db");
const PORT = process.env.PORT;
const cors = require("cors");
const authRouter = require("./features/auth/auth.router");


//middleware
app.use(express.json());
app.use(cors());

//routes
app.use("/user", authRouter);


//homepage route
app.get("/", (req, res) => {
  res.send("this is home page of get route");
});

//starting Server
app.listen(PORT, async () => {
  try {
    await connect();
    console.log(`listeing http://localhost:${PORT}`);
  } catch (er) {
    console.log(er.message);
  }
});
