const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { protect, admin, staff, customer } = require("../middleware/auth");

// ============================================
// PUBLIC ROUTES (None - all require auth)
// ============================================

// ============================================
// CUSTOMER ROUTES
// ============================================
router.post("/", protect, customer, orderController.createOrder);
router.get("/:id", protect, orderController.getOrderById);
router.patch("/:id/cancel", protect, customer, orderController.cancelOrder);

// ============================================
// STAFF & ADMIN ROUTES
// ============================================
router.get("/", protect, staff, orderController.getAllOrders);
router.patch("/:id/status", protect, staff, orderController.updateOrderStatus);

module.exports = router;
