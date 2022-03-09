const mongoose = require("mongoose");
const examSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    unique: true,
    trim: true,
    validate: {
      validator: function (name) {
        return /^[a-zA-Z .]+$/.test(name);
      },
      message: "Name should contain only alphabets",
    },
    required: [true, "Please provide your name"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  minMarks: {
    type: "Number",
    required: [true, "Minimum marks required to pass must be entered"],
  },
  questions: [
    {
      name: {
        type: String,
        required: [true, "Question can't be empty"],
      },
      maxMarks: {
        type: Number,
        required: [true, "Maximum marks for the Question must be entered"],
      },
    },
  ],
  keys: [
    {
      modelAns: {
        type: String,
        required: [true, "Model answer must be entered"],
      },
      keywords: String,
      minLength: Number,
      maxLength: Number,
    },
  ],
  startTime: {
    type: String,
    required: [true, "Start time of the examination must be entered"],
  },
  endTime: {
    type: String,
    required: [true, "End time of the examination must be entered"],
  },
  maxMarks: Number,
  instructions: [
    {
      type: String,
    },
  ],
});

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
