const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect, admin } = require("../middleware/auth");
const { validate, authValidation } = require("../middleware/validation");
const { uploadSingle, handleUploadError } = require("../middleware/upload");

// All routes require admin authentication
router.use(protect);
router.use(admin);

// Dashboard
router.get("/dashboard/stats", adminController.getDashboardStats);

// User management
router.get("/users", adminController.getAllUsers);
router.get("/users/:id", adminController.getUserById);
router.patch("/users/:id/toggle", adminController.toggleUserStatus);

// Staff management
router.post(
  "/staff",
  validate(authValidation.createStaff),
  adminController.createStaff,
);
router.get("/staff", adminController.getAllStaff);
router.get("/staff/:id", adminController.getStaffById);
router.put("/staff/:id", adminController.updateStaff);
router.delete("/staff/:id", adminController.deleteStaff);

// System settings (super admin only)
router.get("/settings", adminController.getSettings);
router.put("/settings", adminController.updateSettings);

router.post(
  "/staff/:id/avatar",
  uploadSingle("avatar"), // now uploadSingle is correct
  handleUploadError,
  adminController.updateStaffAvatar,
);
module.exports = router;
