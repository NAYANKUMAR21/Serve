const express = require("express");
const wordModel = require("./word.model");
const app = express.Router();
let data = [];
app.post("/", async (req, res) => {
  const { username, score, level } = req.body;
  if (!username || !score || !level) {
    return res.status(403).send("Bad request");
  }
  try {
    const check = await wordModel.findOne({ username: username });
    if (check) {
      let x = await wordModel.findOneAndUpdate(
        {
          username: check.username,
        },
        { username: username, score, level },
        { new: true }
      );

      return res.status(200).send(x);
    }
    const newData = await wordModel.create({ username, score, level });
    return res.status(200).send(newData);
  } catch (er) {
    return res.status(404).send(er.message);
  }
});

app.get("/", async (req, res) => {
  try {
    let words = [
      "APPLE",
      "REACT",
      "CODE",
      "ML",
      "he",
      "Random",
      "Word",
      "Generator",
      "is",
      "an",
      "online",
      "tool",
      "that",
      "helps",
      "you",
      "to",
      "generate",
      "random",
      "English",
      "words",
      "It",
      "is",
      "a",
      "useful",
      "tool",
      "if",
      "you",
      "want",
      "to",
      "collect",
      "a",
      "randomized",
      "list",
      "of",
      "common",
      "English",
      "words",
    ];
    let pickOne = Math.floor(Math.random() * words.length);
    data.push(words[pickOne]);
    console.log(data);
    return res.status(200).send({ pickOne, words: words[pickOne] });
  } catch (er) {
    return res.status(404).send(er.message);
  }
});
app.post("/check", async (req, res) => {
  const { username, score, level, word } = req.body;
  try {
    let check = data.pop();
    console.log(req.body, check === word);
    if (word == check) {
      let height = check.length;
      console.log(height);
      let x = await wordModel.findOneAndUpdate(
        {
          username: username,
        },
        { $inc: { score: height } },
        { new: true }
      );

      console.log(data);
      return res.status(200).send(x);
    }

    console.log(data);
    return res.status(404).send("not correct word");
  } catch (er) {
    return res.status(404).send(er.message);
  }
});

module.exports = app;
