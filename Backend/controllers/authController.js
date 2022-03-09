const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const { promisify } = require("util");

function createAndSendToken(user, statusCode, req, res) {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    sameSite: "None",
    secure: true,
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
}
//restrict middleWares
exports.mustBeLoggedIn = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];
  else if (req.cookies.jwt) token = req.cookies.jwt;

  console.log(token);

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError(401, "Unauthenticated!Please sign in"));
  //Pass user to next middleware
  req.user = user;
  next();
});

exports.restrict = (req, res, next) => {
  if (req.user.role != "teacher")
    return next(
      new AppError(403, "Unauthorized!You are not allowed to do this task")
    );
  next();
};

//auth middlewares
exports.signUp = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  createAndSendToken(user, 201, req, res);
});
exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  //If Email/Password missing
  if (!email || !password)
    return next(new AppError(400, "Please provide Email and Password"));
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  //If Email/Password Incorrect
  if (!user || !(await bcrypt.compare(password, user.password)))
    return next(new AppError(400, "Invalid Email or Password"));
  //If all Ok , Send Token
  createAndSendToken(user, 200, req, res);
});

exports.signOut = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ status: "success" });
};
