const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const studentController = require("../controllers/studentController");
const authController = require("../controllers/authController");

router.use(authController.mustBeLoggedIn, authController.restrict);
router.route("/create").post(teacherController.createExam);
router.route("/exams").get(teacherController.getExams);

router
  .route("/results/:id")
  .get(studentController.checkValidId, teacherController.getResults);
router.route("/results/:examId/:studentId").get(teacherController.getResult);
router
  .route("/publish/:id")
  .get(studentController.checkValidId, teacherController.publishResult);

module.exports = router;
