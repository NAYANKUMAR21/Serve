const express = require("express");
const InfoModel = require("./info.model");
const app = express.Router();

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const findUSerJobs = await InfoModel.find({ user: id }).populate("Jobs");
    return res.status(200).send(findUSerJobs);
  } catch (er) {
    return res.status(404).send(er.message);
  }
});

app.post("/", async (req, res) => {
  const { Jobs, user } = req.body;
  try {
    const creatInfo = await InfoModel.create({ Jobs, user });
    return res.status(200).send({ message: "SUCCESSFULLY ADDED" });
  } catch (er) {
    return res.status(404).send(er.message);
  }
});

module.exports = app;
