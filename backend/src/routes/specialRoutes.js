const express = require("express");
const router = express.Router();
const specialController = require("../controllers/specialController");
const { protect, admin } = require("../middleware/auth");
const { uploadSingle, handleUploadError } = require("../middleware/upload");

// Get special dishes (public)
router.get("/", specialController.getAllSpecials);
router.get("/today", specialController.getTodaySpecials);

// Admin routes
router.post(
  "/",
  protect,
  admin,
  uploadSingle("special", "image"),
  handleUploadError,
  specialController.createSpecial,
);

router.put(
  "/:id",
  protect,
  admin,
  uploadSingle("special", "image"),
  handleUploadError,
  specialController.updateSpecial,
);

router.delete("/:id", protect, admin, specialController.deleteSpecial);

module.exports = router;
