const mongoose = require("mongoose");
const file = {
  category: { type: String },
  type: { type: String },
  difficulty: { type: String, enum: ["easy", "medium", "hard"] },
  question: { type: String },
  correct_answer: { type: String },
  incorrect_answers: { type: Object },
};
const quizSchema = new mongoose.Schema(file, { versionKey: false });
const quizModel = mongoose.model("quiz", quizSchema);
module.exports = quizModel;
