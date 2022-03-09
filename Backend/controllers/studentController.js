const mongoose = require("mongoose");
const axios = require("axios");
const Exam = require("../models/Exam");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Result = require("../models/Result");

exports.checkValidId = (req, res, next) => {
  console.log("params", req.params);
  if (req.params.id.length !== 24)
    return next(new AppError(400, "No such exam found"));
  next();
};
exports.getExam = catchAsync(async (req, res, next) => {
  const exam = await Exam.findById(mongoose.Types.ObjectId(req.params.id));

  if (!exam) return next(new AppError(400, "No such exam found"));
  res.status(200).json({
    status: "success",
    data: {
      exam,
    },
  });
});

exports.submitExam = catchAsync(async (req, res, next) => {
  const { answers } = req.body;
  const exam = await Exam.findById(req.params.id);
  if (!exam) return next(new AppError(400, "No such exam found"));

  let marks = [];
  const keys = exam.keys;
  const questions = exam.questions;
  let totalMarks = 0;
  let studentMarks = 0;

  for (let i = 0; i < answers.length; i++) {
    console.log("Question " + (i + 1) + ":\n");
    let score = 0;
    //Similarity score

    const { data } = await axios({
      method: "GET",
      url: encodeURI(
        `https://api.dandelion.eu/datatxt/sim/v1?text1=${answers[i]}&text2=${keys[i].modelAns}&token=${process.env.API_TOKEN}`
      ),
    });
    console.log("SIMSCORE123", data);
    score += Math.round(data.similarity * 60);

    console.log("Score after SIM:", score);
    console.log("ModelAns,Answers", keys[i].modelAns, "*****", answers[i]);
    //Length Check
    let words = answers[i].split(" ");
    let length = words.length;
    words = [...new Set(words)];
    if (length >= keys[i].minLength) score += 10;
    else score += (length / keys[i].minLength) * 10;

    console.log("Score after Length score:", score);
    //Keywords check --> 30
    let count = 0;
    const keywords = keys[i].keywords.split(",");

    for (let i = 0; i < keywords.length; i++) {
      for (let j = 0; j < length; j++) {
        if (keywords[i] == words[j]) count++;
      }
    }

    if (count >= keywords.length) score += 30;
    else score += (count / keywords.length) * 30;

    totalMarks += questions[i].maxMarks * 1;
    let finalScore = Math.round((score / 100) * questions[i].maxMarks);
    studentMarks += finalScore * 1;

    marks.push((score / 100) * questions[i].maxMarks);
    console.log("Score after keyword score:", score);
  }
  //Result generation
  const percentage = Math.round(((studentMarks * 1) / totalMarks) * 100) * 1;
  console.log("Percentage,studentMarks", percentage, studentMarks);
  const status = studentMarks >= exam.minMarks ? "pass" : "fail";

  const result = await Result.create({
    examId: req.params.id,
    submittedBy: req.user._id,
    marks,
    answers,
    score: studentMarks,
    percentage,
    status,
  });

  if (!result) return next(new AppError(500, "Something went wrong"));
  console.log(result);
  res.status(200).json({
    status: "success",
    message: "Exam has been submitted successfully",
  });
});

exports.getResults = catchAsync(async (req, res, next) => {
  console.log("req.user", req.user);
  const results = await Result.find({
    submittedBy: req.user._id,
    published: true,
  })
    .populate("examId")
    .populate("submittedBy");
  if (!results) return next(new AppError(404, "No results found"));
  res.status(200).json({
    status: "success",
    data: {
      results,
    },
  });
});

exports.getResult = catchAsync(async (req, res, next) => {
  const result = await Result.findOne({
    submittedBy: req.user._id,
    published: true,
    examId: req.params.id,
  })
    .populate("examId")
    .populate("submittedBy");
  if (!result) return next(new AppError(404, "No such result found"));
  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
});
