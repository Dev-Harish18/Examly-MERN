const Exam = require("../models/Exam");
const catchAsync = require("../utils/catchAsync");
const Result = require("../models/Result");
const mongoose = require("mongoose");
const AppError = require("../utils/AppError");

exports.createExam = catchAsync(async (req, res, next) => {
  const exam = await Exam.create({ ...req.body, createdBy: req.user._id });

  res.status(201).json({
    status: "success",
    data: {
      exam: { ...exam, createdBy: req.user._id },
    },
  });
});

exports.getResults = catchAsync(async (req, res, next) => {
  const results = await Result.find({
    examId: mongoose.Types.ObjectId(req.params.id),
  })
    .populate("examId")
    .populate("submittedBy");
  console.log(req.params, results);
  if (!results?.length) return next(new AppError(404, "No results found"));
  res.status(200).json({
    status: "success",
    data: {
      results,
    },
  });
});

exports.getExams = catchAsync(async (req, res, next) => {
  const exams = await Exam.find({
    createdBy: req.user._id,
  }).populate("createdBy");

  console.log("Exams", exams);

  if (!exams?.length) return next(new AppError(404, "No exams found"));
  res.status(200).json({
    status: "success",
    data: {
      exams,
    },
  });
});

exports.getResult = catchAsync(async (req, res, next) => {
  if (req.params.studentId.length !== 24 || req.params.examId.length !== 24)
    return next(new AppError(404, "No such result found"));
  const result = await Result.findOne({
    submittedBy: req.params.studentId,
    examId: req.params.examId,
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
exports.publishResult = catchAsync(async (req, res, next) => {
  const results = await Result.updateMany(
    { examId: req.params.id },
    { published: true }
  );
  if (!results) return next(new AppError(404, "No such Exams found"));
  res.status(200).json({
    status: "success",
    message: "Results have been published successfully",
  });
});
