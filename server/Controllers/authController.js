const User = require("./../Models/userModel");
const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const CustomError = require("./../Utils/CustomeError");
const util = require("util");
const sendEmail = require("./../Utils/email");
const crypto = require("crypto");
const { logCritical } = require("../Logs/logHelper");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendResponse = (user, statusCode, res, message) => {
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  //secure cookie only in production
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    message,
    token,
    data: {
      user,
    },
  });
};

exports.signup = asyncErrorHandler(async (req, res, next) => {
  const newUser = await User.create(req.body);

  createSendResponse(newUser, 201, res, "User Created & Signup Successfully");
});

exports.login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password exist
  if (!email || !password) {
    const error = new CustomError("Please provide email and password", 400);
    logCritical("Invalid Email Or Password While Login: " + error);
    return next(error);
  }

  //check if user exists with given email and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password, user.password))) {
    const error = new CustomError("Invalid email or password", 401);
    return next(error);
  }

  createSendResponse(user, 200, res, "Login Successful");
});

exports.logout = (req, res) => {
  // Clear JWT cookie
  res.clearCookie("jwt");

  res.status(200).json({ status: "success" });
};

exports.protect = asyncErrorHandler(async (req, res, next) => {
  //1.Read the token & check if it exists
  const testToken = req.headers.authorization;
  let token;

  if (testToken && testToken.startsWith("Bearer")) {
    token = testToken.split(" ")[1];
  }
  if (!token) {
    next(new CustomError("You are not logged in! Please log in", 401));
  }

  console.log(token);

  //2. Verify the token
  const decodedToken = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  console.log(decodedToken);

  //3. Check if user still exists
  const user = await User.findById(decodedToken.id);

  if (!user) {
    next(new CustomError("User with the token does not exist", 401));
  }

  //4. Check if user changed password after the token was issued
  const isPasswordChanged = await user.isPasswordChanged(decodedToken.iat);
  if (isPasswordChanged) {
    next(new CustomError("User recently changed password! Please log in", 401));
  }

  //5. Grant access to protected route
  req.user = user; //save user to request object for future use(roles etc.)

  next();
});

//restrict middleware for roles (wrapper function)(...roles used to pass multiple roles as arguments)
exports.restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      next(
        new CustomError(
          "You do not have permission to perform this action",
          403
        )
      );
    }
    next();
  };
};

//forgot password
exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
  //1. Get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new CustomError("There is no user with that email address", 404)
    );
  }

  //2. Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //3. Send it to user's
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `We had received a request to reset your password. Please click on the link below to reset your password. If you did not request this, please ignore this email. \n\n${resetUrl}\n\nThis link is valid for 10 minutes.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 minutes)",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Password Reset sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new CustomError(
        "There was an error sending the password reset email. Try again later!",
        500
      )
    );
  }
});

//reset password
exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
  //1. Get user based on the token
  const passResetToken = crypto
    .createHash("sha256")
    .update(req.params.resetPassToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: passResetToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  //2. If token has not expired and there is a user, set the new password
  if (!user) {
    return next(new CustomError("Token is invalid or has expired", 400));
  }

  //3. Update changed password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  user.passwordChangedAt = Date.now();
  await user.save();

  //4. Log the user in, send JWT
  createSendResponse(user, 200, res);
});

exports.checkloginstatus = async (req, res, next) => {
  try {
    // Extract JWT token from the request headers
    const clientJWTToken = req.headers.authorization?.split(" ")[1];

    console.log(clientJWTToken);

    //2. Verify the token
    const decodedToken = await util.promisify(jwt.verify)(
      clientJWTToken,
      process.env.JWT_SECRET
    );
    console.log("Decode", decodedToken);

    const user = await User.findById(decodedToken.id);

    console.log(user);
    if (!user) {
      next(new CustomError("User with the token does not exist", 401));
    }

    const isPasswordChanged = await user.isPasswordChanged(decodedToken.iat);
    if (isPasswordChanged) {
      next(
        new CustomError(
          "User recently changed password! Please log in again",
          401
        )
      );
    }

    //return if user is logged in

    res.status(200).json({
      status: "success",
      message: "User is logged in",
    });
  } catch (error) {
    // Handle errors
    console.error("Error checking token:", error);

    res.status(204).json({
      status: "unsucessful",
      message: "User is not logged in",
    });
  }
};
