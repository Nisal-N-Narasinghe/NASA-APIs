const express = require("express");
const userController = require("./../Controllers/userController");
const authController = require("./../Controllers/authController");

const router = express.Router();

router
  .route("/getAllUsers")
  .get(
    authController.protect,
    authController.restrict("admin"),
    userController.getAllUsers
  );

router
  .route("/updatepassword")
  .patch(authController.protect, userController.updatePassword);

router
  .route("/updateprofile")
  .patch(authController.protect, userController.updateProfile);

router
  .route("/deleteprofile")
  .delete(authController.protect, userController.deleteProfile);

router.route("/getme").get(authController.protect, userController.getMe);

module.exports = router;
