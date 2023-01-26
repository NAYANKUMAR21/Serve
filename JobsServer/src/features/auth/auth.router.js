const express = require("express");
const authModel = require("./auth.model");
const app = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send({ message: "IN-Valid credentailss" });
  }
  console.log(req.body, "from loginrpute");
  try {
    const checkUSer = await authModel.findOne({ email });
    console.log(checkUSer);

    bcrypt.compare(password, checkUSer.password, async function (err, result) {
      if (result) {
        const token = jwt.sign(
          { id: checkUSer._id, email: email, name: checkUSer.name },
          "NAYANKUMAR",
          {
            expiresIn: "7 days",
          }
        );
        return res.status(200).send({ message: "Login Successfully", token });
      }
      return res.status(400).send({ message: "WROng occurred in hashing" });
    });
  } catch (er) {
    return res.status(404).send({ message: er.message });
  }
});
app.post("/signup", async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !password || !name) {
    return res.status(404).send({ message: "IN-Valid credentailss" });
  }
  try {
    console.log(req.body);

    const check = await authModel.findOne({ email });
    if (check) {
      return res.status(404).send({ message: "User already registered" });
    }
    bcrypt.hash(password, 10, async function (err, hash) {
      if (hash) {
        const newUser = await authModel.create({ name, email, password: hash });
        return res.status(200).send({ message: newUser });
      }
      return res.status(400).send({ message: "WROng occurred in hashing" });
    });
  } catch (er) {
    return res.status(404).send({ message: er.message });
  }
});

module.exports = app;
