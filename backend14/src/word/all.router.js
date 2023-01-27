const express = require("express");
const wordModel = require("./word.model");
const app = express.Router();

app.get("/", async (req, res) => {
  try {
    const getPlayer = await wordModel.find().sort({ score: "desc" });
    return res.status(200).send(getPlayer);
  } catch (er) {
    return res.status(404).send(er.message);
  }
});

module.exports = app;
