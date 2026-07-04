const HeroSettings = require("../models/HeroSettings");
const { cloudinary, deleteFile } = require("../config/cloudinary");
const { AppError } = require("../middleware/errorHandler");
const logger = require("../utils/logger");

class HeroController {
  // Get active hero settings
  async getActiveHero(req, res, next) {
    try {
      let hero = await HeroSettings.findOne({ isActive: true });

      if (!hero) {
        // Create default if none exists
        hero = await HeroSettings.create({
          title: "Welcome to Aroma Restaurant",
          subtitle: "Experience the finest cuisine in town",
          discount: 20,
          discountLabel: "Special Discount",
          discountDescription: "Get 20% off on your first order",
        });
      }

      res.json({
        success: true,
        data: hero,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update hero settings
  async updateHero(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // If there's a file, use Cloudinary URL
      if (req.file) {
        // Delete old background image if exists
        const oldHero = await HeroSettings.findById(id);
        if (
          oldHero &&
          oldHero.backgroundImage &&
          oldHero.backgroundImage.includes("cloudinary")
        ) {
          const publicId = oldHero.backgroundImage
            .split("/")
            .pop()
            .split(".")[0];
          await deleteFile(`aroma/hero/${publicId}`);
        }
        updateData.backgroundImage = req.file.path;
      }

      const hero = await HeroSettings.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: Date.now() },
        { new: true, runValidators: true },
      );

      if (!hero) {
        throw new AppError("Hero settings not found", 404);
      }

      res.json({
        success: true,
        message: "Hero settings updated successfully",
        data: hero,
      });
    } catch (error) {
      next(error);
    }
  }

  // Upload hero background image
  async uploadBackground(req, res, next) {
    try {
      const { id } = req.params;
      const file = req.file;

      if (!file) {
        throw new AppError("No file uploaded", 400);
      }

      const hero = await HeroSettings.findById(id);
      if (!hero) {
        throw new AppError("Hero settings not found", 404);
      }

      // Delete old background image
      if (hero.backgroundImage && hero.backgroundImage.includes("cloudinary")) {
        const publicId = hero.backgroundImage.split("/").pop().split(".")[0];
        await deleteFile(`aroma/hero/${publicId}`);
      }

      hero.backgroundImage = file.path;
      await hero.save();

      res.json({
        success: true,
        message: "Background image uploaded successfully",
        data: {
          backgroundImage: file.path,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new HeroController();
