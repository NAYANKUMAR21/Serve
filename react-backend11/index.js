const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./config/db");
const authrouter = require("./features/auth/auth.router");
app.use(cors());
app.use(express.json());
app.use("/user", authrouter);
app.get("/", (req, res) => {
  res.send("THIS IS HOME PAE GET");
});

app.listen(8080, async () => {
  try {
    await connect();
    console.log(`server listening on http://localhost:8080`);
  } catch (er) {
    console.log(er);
  }
});
