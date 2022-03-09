const express = require("express");
const dotEnv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const connectDB = require("./utils/connectDB");
const evalRouter = require("./routes/evalRoutes");
const authRouter = require("./routes/authRoutes");
const teacherRouter = require("./routes/teacherRoutes");
const studentRouter = require("./routes/studentRoutes");
const globalErrorHandler = require("./utils/globalErrorHandler");
dotEnv.config();
//Connecting mongodb
connectDB();
//cors
const corsOptions = {
  //To allow requests from client
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
//bodyparser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Mounting routes
app.use("/api/v1/eval", evalRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/teacher", teacherRouter);
app.use("/api/v1/student", studentRouter);

//Listening to server
app.all("*", (req, res, next) => {
  return next(new AppError(404, "Page not found"));
});
app.use(globalErrorHandler);
app.listen(process.env.PORT || 3000, () =>
  console.log(`App started on port ${process.env.PORT}`)
);
module.exports = app;
