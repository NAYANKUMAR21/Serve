const { Router } = require("express");
const infoModel = require("./info.model");
const app = Router();
const jwt = require("jsonwebtoken");
app.get("/:token", async (req, res) => {
  const { token } = req.params;

  console.log(req.params, token);
  if (!token) {
    return res.status(403).send("Cannot be given");
  }
  try {
    const verify = jwt.verify(token, "NAYANKUMAR");
    const userJobs = await infoModel
      .find({ user: verify.id })
      .populate("appliedJob");
    console.log(userJobs);
    return res.status(200).send(userJobs);
  } catch (er) {
    return res.status(404).send({ message: er.message });
  }
});

app.post("/", async (req, res) => {
  const { id, token } = req.body;
  //id is job id
  try {
    const verify = jwt.verify(token, "NAYANKUMAR");

    const insertJob = await infoModel.create({
      appliedJob: id,
      user: verify.id,
    });
    return res.status(200).send({ message: insertJob });
  } catch (er) {
    return res.status(404).send({ message: er.message });
  }
});

module.exports = app;
