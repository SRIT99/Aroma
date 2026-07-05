const express = require("express");
const router = express.Router();
const heroController = require("../controllers/heroController");
const { protect, admin } = require("../middleware/auth");
const {
  uploadSingle,
  handleUploadError,
} = require("../middleware/upload");
// Get active hero settings (public)
router.get("/active", heroController.getActiveHero);

// Update hero settings (admin only)
router.put(
  "/:id",
  protect,
  admin,
  uploadSingle("hero", "backgroundImage"),
  handleUploadError,
  heroController.updateHero,
);

router.post(
  "/:id/background",
  protect,
  admin,
  uploadSingle("backgroundImage"),
  handleUploadError,
  heroController.uploadBackground,
);
module.exports = router;
