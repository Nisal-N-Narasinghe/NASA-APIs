const CustomError = require("./../Utils/CustomeError");

const devErrors = (res, error) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const castErrorHandler = (err) => {
  const msg = `Invalid value for ${err.path}: ${err.value}!`;
  return new CustomError(msg, 400);
};

const duplicateKeyErrorHandler = (err) => {
  const email = err.keyValue.email;
  const name = err.keyValue.name;

  if (email) {
    const msg = `There is already a user with ${email}. Please use another email address!`;
    return new CustomError(msg, 400);
  }

  if (name) {
    const msg = `There is already a User with ${name}. Please use another User name!`;
    return new CustomError(msg, 400);
  }
};

const validationErrorHandler = (err) => {
  const errors = Object.values(err.errors).map((val) => val.message);
  const errorMessages = errors.join(". ");
  const msg = `Invalid input data: ${errorMessages}`;

  return new CustomError(msg, 400);
};

const prodErrors = (res, error) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later.",
    });
  }
};

const handleExpiredTokenError = (error) => {
  const msg = "Your token has expired! Please log in again.";
  return new CustomError(msg, 401);
};

const handleJWTErrors = (error) => {
  const msg = "Please log in first.";
  return new CustomError(msg, 401);
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    devErrors(res, error);
  } else if (process.env.NODE_ENV === "production") {
    if (error.name === "CastError") error = castErrorHandler(error);
    if (error.code === 11000) error = duplicateKeyErrorHandler(error);
    if (error.name === "ValidationError") error = validationErrorHandler(error);
    if (error.name === "TokenExpiredError")
      error = handleExpiredTokenError(error);
    if (error.name === "JsonWebTokenError") error = handleJWTErrors(error);
    prodErrors(res, error);
  }
};
