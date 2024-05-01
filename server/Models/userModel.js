const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const validFacultyNames = ["Computing", "Engineering", "Business"];

const userSchema = new mongoose.Schema({
  //name, email,photo ,password,confirmPassword,createdAt,updatedAt

  name: {
    type: String,
    unique: [true, "Name already exists"],
    required: [true, "Please enter your name"],
    validate: {
      validator: function (val) {
        if (this.role === "faculty") {
          return validFacultyNames.includes(val);
        }
        return true;
      },
      message: `Enter a valid faculty name from :- ${validFacultyNames}`,
    },
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: [true, "Email already exists"],
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  photo: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: 8,
    select: false, // avoid getting password in response
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    minlength: 8,
    validate: {
      //save and create only. does not work on update
      validator: function (val) {
        return val == this.password;
      },
      message: "Password & confirm Password does not match",
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  //encrppt the password
  this.password = bcrypt.hashSync(this.password, 12);

  //delete the confirmPassword field
  this.confirmPassword = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  //this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

//instance method to compare password
userSchema.methods.comparePassword = async function (pswd, pswDB) {
  return await bcrypt.compare(pswd, pswDB);
};

userSchema.methods.isPasswordChanged = async function (jwtTimeStamp) {
  if (this.passwordChangedAt) {
    const passwordChangedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(passwordChangedTimeStamp, jwtTimeStamp);
    return jwtTimeStamp < passwordChangedTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000; //10 minutes

  console.log(resetToken, this.passwordResetToken);
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
