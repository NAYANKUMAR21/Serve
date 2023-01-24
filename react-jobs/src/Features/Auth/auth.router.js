require("dotenv").config();
const express = require("express");
const userModel = require("./auth.model");
const app = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send("Un-Authorized");
  }
  try {
    const check = await userModel.findOne({ email: email });
    console.log(check);
    const passwordCheck = await bcrypt.compare(password, check.password);
    console.log(passwordCheck);
    if (check && passwordCheck) {
      const newToken = jwt.sign(
        { name: check.name, email: check.email },
        "NAYANKUMAR"
      );
      var decoded = jwt.verify(newToken, "NAYANKUMAR");
      return res
        .status(200)
        .send({ message: "Loggin Sucessfully", token: newToken, decoded });
    }
    return res.status(403).send("Account Doesnt exists");
  } catch (er) {
    console.log(er.message, "login error");
    res.status(404).send();
  }
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(403).send("Un-Authorized");
  }
  try {
    if (await userModel.findOne({ email: email })) {
      return res.status(404).send("User already exists");
    }
    const hash = await bcrypt.hash(password, 10);
    const createUser = await userModel.create({
      email: email,
      password: hash,
      versionKey: false,
    });
    return res
      .status(201)
      .send({ message: "Account Created Successfully", user: createUser });
  } catch (er) {
    return res.status(404).send(er.message);
  }
});

module.exports = app;
