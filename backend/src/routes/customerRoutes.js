const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const { protect, customer } = require("../middleware/auth");

// All routes require customer authentication
router.use(protect);
router.use(customer);

// Profile
router.get("/profile", customerController.getProfile);
router.put("/profile", customerController.updateProfile);

// Orders
router.get("/orders", customerController.getOrders);

// Loyalty
router.get("/loyalty", customerController.getLoyaltyInfo);

// Addresses
router.get("/addresses", customerController.getAddresses);
router.post("/addresses", customerController.addAddress);
router.put("/addresses/:index", customerController.updateAddress);
router.delete("/addresses/:index", customerController.deleteAddress);

// Favorites
router.get("/favorites", customerController.getFavorites);
router.post("/favorites/:menuItemId", customerController.addFavorite);
router.delete("/favorites/:menuItemId", customerController.removeFavorite);

module.exports = router;
