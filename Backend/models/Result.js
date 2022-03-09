const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  answers: [
    {
      type: String,
    },
  ],
  marks: [
    {
      type: Number,
    },
  ],
  published: {
    type: Boolean,
    default: false,
  },
  score: Number,
  percentage: Number,
  status: String,
});

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
