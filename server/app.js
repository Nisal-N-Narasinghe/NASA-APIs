const express = require("express");
const authRouter = require("./Routes/authRouter");

const userRouter = require("./Routes/userRoutes");

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const sanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const CustomError = require("./Utils/CustomeError");
const globalErrorHandler = require("./Controllers/errorController");

const { logCriticalErrors } = require("./Logs/logHelper");

const app = express();

const cors = require("cors");

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "React app URL");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//as a good practice, at the top we should use helmet to secure our app
app.use(helmet());

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again in 1 hour!",
});

app.use("/api", limiter);

//limitation of body size to prevent DOS(Denial of Service) attack
app.use(express.json({ limit: "10kb" }));

//Data sanitization against NoSQL query injection
app.use(sanitize());

//Data sanitization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: ["courseName", "courseCode", "courseCredit"],
  })
);

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/user", userRouter);

app.all("*", (req, res, next) => {
  const err = new CustomError(
    `Can't find ${req.originalUrl} on the server!`,
    404
  );
  next(err);
});

app.use(logCriticalErrors);

app.use(globalErrorHandler);

module.exports = app;
