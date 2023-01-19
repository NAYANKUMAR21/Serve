const express = require("express");
const userModel = require("./auth.model");
const app = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send("Un-authorized");
  }
  try {
    const check = await userModel.findOne({ email: email });

    if (check) {
      const result = await bcrypt.compare(password, check.password);
      if (result) {
        const token = jwt.sign(
          { id: check._id, name: check.name, email: email },
          "SECRET"
        );
        return res.status(200).send({ message: "Login successfull", token });
      }
    }
    return res.status(404).send({ message: "Invalid Credentails" });
  } catch (er) {
    console.log(er.message);
    res.send(er.message);
  }
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(403).send("Un-Authorized");
  }
  try {
    const check = await userModel.findOne({ email: email });

    if (check) {
      return res.status(402).send("User already existed");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUSer = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).send(newUSer);
  } catch (er) {
    console.log(er.message);
    return res.status(404).send(er.message);
  }
});

module.exports = app;
