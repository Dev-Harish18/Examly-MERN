const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    validate: {
      validator: function (name) {
        return /^[a-zA-Z .]+$/.test(name);
      },
      message: "Name should contain only alphabets",
    },
    required: [true, "Please provide your name"],
  },
  roll: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    trim: true,
    default: "student",
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Please provide email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    validate: [
      (pass) => pass.length >= 8 && pass.length <= 30,
      "Password must be minimum 8 characters and maximum 30 characters long",
    ],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
});

userSchema.pre("save", async function (next) {
  console.log(this);
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = undefined;

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
