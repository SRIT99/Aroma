const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const { protect, admin } = require("../middleware/auth");
const { uploadSingle, handleUploadError } = require("../middleware/upload");

// Public routes
router.get("/", menuController.getAllMenu);
router.get("/category/:category", menuController.getMenuByCategory);
router.get("/special", menuController.getSpecialItems);
router.get("/search", menuController.searchMenu);

// Admin routes
router.post(
  "/",
  protect,
  admin,
  uploadSingle("menu", "image"),
  handleUploadError,
  menuController.createMenuItem,
);

router.put(
  "/:id",
  protect,
  admin,
  uploadSingle("menu", "image"),
  handleUploadError,
  menuController.updateMenuItem,
);

router.delete("/:id", protect, admin, menuController.deleteMenuItem);

module.exports = router;
