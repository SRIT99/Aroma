const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");
const { protect, staff } = require("../middleware/auth");

// All routes require staff authentication
router.use(protect);
router.use(staff);

// Profile
router.get("/profile", staffController.getProfile);
router.put("/profile", staffController.updateProfile);

// Orders
router.get("/orders", staffController.getAssignedOrders);
router.patch("/orders/:orderId/status", staffController.updateOrderStatus);

// Availability
router.patch("/availability", staffController.updateAvailability);

module.exports = router;
