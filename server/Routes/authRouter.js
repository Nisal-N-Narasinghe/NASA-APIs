const express = require("express");
const authController = require("./../Controllers/authController");

const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/forgotpassword").post(authController.forgotPassword);
router
  .route("/resetpassword/:resetPassToken")
  .patch(authController.resetPassword);

router.route("/logout").get(authController.logout);

router
  .route("/checkloginstatus")
  .get(authController.protect, authController.checkloginstatus);

module.exports = router;
