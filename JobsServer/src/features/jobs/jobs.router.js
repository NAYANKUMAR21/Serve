const express = require("express");
const jobModel = require("./jobs.model");
const app = express.Router();
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.get("/", async (req, res) => {
  try {
    const allJobs = await jobModel.find();
    return res.status(200).send(allJobs);
  } catch (er) {
    return res.send({ message: "er.message" });
  }
});
app.post("/", async (req, res) => {
  const { token, CompanyName, Position, Location, Contract } = req.body;
  try {
    console.log(req.body, "from this");
    const verify = jwt.verify(token, "NAYANKUMAR");
    if (verify.email.includes("@masaischool.com")) {
      const insertOpening = await jobModel.create({
        CompanyName,
        Position,
        Location,
        Contract,
      });
      return res.status(200).send(insertOpening);
    }
    return res
      .status(403)
      .send({ message: "This email doesnt have authority" });
  } catch (er) {
    return res.status(404).send({ message: er.message });
  }
});
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const alljobs = await jobModel.findOne({ _id: id });
    return res.status(200).send(alljobs);
  } catch (er) {
    return res.send({ message: "er.message" });
  }
});
app.put("/", async (req, res) => {
  const { _id, CompanyName, Position, Contract, Location } = req.body;
  try {
    const nextraPut = await jobModel.findByIdAndUpdate(
      { _id: _id },
      { CompanyName, Position, Contract, Location },
      { new: true }
    );
    return res.status(202).send(nextraPut);
  } catch (er) {
    return res.send({ message: "er.message" });
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const request = await jobModel.findByIdAndDelete({ _id: id });
    return res.status(202).send(request);
  } catch (er) {
    return res.status(404).send({ message: er.message });
  }
});
module.exports = app;
