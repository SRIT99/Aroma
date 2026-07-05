const HeroSettings = require("../models/HeroSettings");
const { AppError } = require("../middleware/errorHandler");
const logger = require("../utils/logger");

class HeroService {
  // Get active hero settings (or create default)
  async getActiveHero() {
    try {
      let hero = await HeroSettings.findOne({ isActive: true });
      if (!hero) {
        // Create default if none exists
        hero = await HeroSettings.create({
          title: "Welcome to Aroma Restaurant",
          subtitle: "Experience the finest cuisine in Gauradaha",
          discount: 20,
          discountLabel: "Special Offer",
          discountDescription: "Get 20% off on your first order",
          ctaText: "Order Now",
          ctaLink: "/menu",
          secondaryCtaText: "Today's Special",
          secondaryCtaLink: "/specials",
          stats: [
            { label: "Happy Customers", value: "500+" },
            { label: "Delicious Dishes", value: "50+" },
            { label: "Years of Service", value: "5+" },
          ],
        });
        logger.info("Default hero settings created");
      }
      return hero;
    } catch (error) {
      logger.error(`Get active hero error: ${error.message}`);
      throw error;
    }
  }

  // Update hero settings (admin)
  async updateHero(id, data) {
    try {
      const hero = await HeroSettings.findByIdAndUpdate(
        id,
        { ...data, updatedAt: new Date() },
        { new: true, runValidators: true },
      );
      if (!hero) throw new AppError("Hero settings not found", 404);
      logger.info(`Hero settings updated: ${hero._id}`);
      return hero;
    } catch (error) {
      logger.error(`Update hero error: ${error.message}`);
      throw error;
    }
  }

  // Upload background image (admin)
  async uploadBackground(id, imageUrl) {
    try {
      const hero = await HeroSettings.findById(id);
      if (!hero) throw new AppError("Hero settings not found", 404);
      hero.backgroundImage = imageUrl;
      await hero.save();
      logger.info(`Hero background updated: ${hero._id}`);
      return hero;
    } catch (error) {
      logger.error(`Upload background error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new HeroService();
