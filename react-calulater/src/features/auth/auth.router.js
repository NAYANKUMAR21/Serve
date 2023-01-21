const express = require("express");
const userModel = require("./auth.model");
const app = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
app.get("/", async (req, res) => {
  try {
    const user = await userModel.find();
    return res.status(200).send(user);
  } catch (er) {
    return res.status(404).send({ message: "ACCESS DENIED" });
  }
});
app.get("/:email", async (req, res) => {
  const { email } = req.params;
  console.log(email, "from get");
  if (!email) {
    return res.status(403).send({ message: "Missing identity to access" });
  }
  try {
    const user = await userModel.findOne({ email: email }, { password: 0 });
    return res.status(200).send(user);
  } catch (er) {
    return res.status(404).send({ message: "ACCESS DENIED" });
  }
});
app.post("/calculate", async (req, res) => {
  const { Amount, Time, rate } = req.body;
  if (!Amount || !Time || !rate) {
    return res.status(403).send({ message: "Missing identity to access" });
  }
  try {
    let i = rate / 100;
    let formula = Math.floor(Amount * (((1 + i) ** Time - 1) / i));
    let Total_InvestMent = Amount * Time;
    let Total_Intrest_gained = Math.abs(formula - Total_InvestMent);
    return res.status(200).send({
      message: "Successfully calculaed",
      investedAmount: Total_InvestMent,
      TotalIntrest: Total_Intrest_gained,
      MatruityValue: formula,
    });
  } catch (er) {
    return res.status(404).send({ message: "ACCESS DENIED" });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).send("Un-Authorized");
  }
  try {
    const check = await userModel.findOne({ email: email });
    const passwordCheck = await argon2.verify(check.password, password);
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
    const hash = await argon2.hash(password);
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
