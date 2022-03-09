const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const authController = require("../controllers/authController");

router.use(authController.mustBeLoggedIn);
router.route("/results").get(studentController.getResults);

router
  .route("/exam/:id")
  .get(studentController.checkValidId, studentController.getExam)
  .post(studentController.checkValidId, studentController.submitExam);
router
  .route("/results/:id")
  .get(studentController.checkValidId, studentController.getResult);

module.exports = router;
