const User = require("./../Models/userModel");
const asyncErrorHandler = require("./../Utils/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const CustomError = require("./../Utils/CustomeError");

const filterReqObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendResponse = (user, statusCode, res) => {
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
    token,
    data: {
      user,
    },
  });
};

exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    length: users.length,
    data: {
      users,
    },
  });
});

exports.getMe = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
  //1. Get user from the collection
  const user = await User.findById(req.user._id).select("+password");

  //2. Check if posted password is correct
  if (!(await user.comparePassword(req.body.currentPassword, user.password))) {
    return next(new CustomError("Your current password is wrong", 401));
  }

  //3. If so, update password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  //4. Log user in, send JWT
  createSendResponse(user, 200, res);
});

exports.updateProfile = asyncErrorHandler(async (req, res, next) => {
  //1. Create error if user POSTs password data and role data
  if (req.body.password || req.body.confirmPassword) {
    return next(new CustomError("This is not for password updates.", 400));
  }
  if (req.body.role) {
    return next(new CustomError("This is not for role updates.", 400));
  }

  //2. Update user document
  const filterObj = filterReqObj(req.body, "name", "email", "photo");
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filterObj, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteProfile = asyncErrorHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
