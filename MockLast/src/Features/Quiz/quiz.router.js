const express = require("express");
const quizModel = require("./quiz.model");
const ansModel = require("./user.model");
const app = express.Router();

app.post("/", async (req, res) => {
  const { numberQ, diff, category } = req.body;
  console.log(req.body);
  if (!numberQ || !diff || !category) {
    return res.status(400).send({ message: "Cannot be accessed" });
  }
  try {
    console.log(req.body);
    const addData = await quizModel
      .find({ difficulty: diff, category: category })
      .limit(numberQ);
    return res.status(200).send(addData);
  } catch (er) {
    return res.status(400).send({ message: er.message });
  }
});
app.post("/ans", async (req, res) => {
  const { name, score, level } = req.body;
  if (!name || !score || !level) {
    return res.status(400).send({ message: "structure is not correct" });
  }
  try {
    console.log(req.body);
    const answers = await ansModel.create({ name, level, score });
    return res.status(200).send({ message: "Success full", answers });
  } catch (er) {
    return res.status(400).send({ message: er.message });
  }
});
app.get("/", async (req, res) => {
  try {
    const all = await ansModel
      .aggregate([{ $group: { _id: "$name", score: { $sum: "$score" } } }])
      .sort({ score: "desc" });
    //{ $match: {} },
    //{ $group: { _id: "name", score: { $sum: "score" } } },
    //
    return res.status(200).send(all);
  } catch (er) {
    return res.status(400).send({ message: er.message });
  }
});
module.exports = app;
