require("dotenv").config();
const express = require("express");

const JobsModel = require("./jobs.model");
const app = express.Router();
app.get("/", async (req, res) => {
  try {
    const getJobs = await JobsModel.find();
    return res.status(201).send(getJobs);
  } catch (er) {
    return res.status(404).send(er.message);
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getSingle = await JobsModel.findOne({ _id: id });
    return res.status(201).send(getSingle);
  } catch (er) {
    return res.status(404).send(er.message);
  }
});
app.post("/", async (req, res) => {
  const { CompanyName, Position, Contract, Location, email } = req.body;
  if (!CompanyName || !Position || !Contract || !Location) {
    return res.status(403).send({ message: "Un-Authorized" });
  }
  try {
    if (email.includes("@masaischool.com")) {
      const addJobs = await JobsModel.create({
        CompanyName,
        Position,
        Location,
        Contract,
      });
      return res
        .status(200)
        .send({ message: "ADDED SUCCESSFULLY", job: addJobs });
    }
    return res.status(404).send({ message: "Bad Request" });
  } catch (er) {
    return res.status(404).send(er.message);
  }
});
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getSingle = await JobsModel.findByIdAndDelete({ _id: id });
    return res.status(201).send(getSingle);
  } catch (er) {
    return res.status(404).send(er.message);
  }
});

module.exports = app;
