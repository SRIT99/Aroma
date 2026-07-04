const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { validate, authValidation } = require("../middleware/validation");
const { protect } = require("../middleware/auth");

// Public routes
router.post(
  "/register",
  validate(authValidation.register),
  authController.register,
);

router.post("/login", validate(authValidation.login), authController.login);

// Protected routes
router.get("/me", protect, authController.getProfile);
router.put("/profile", protect, authController.updateProfile);
router.post("/change-password", protect, authController.changePassword);
router.post("/logout", protect, authController.logout);

module.exports = router;
