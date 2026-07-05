const SpecialDish = require('../models/SpecialDish');
const { AppError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');

class SpecialService {
  // Get all special dishes (with filters)
  async getAllSpecials({ isActive, isTodaySpecial, limit }) {
    try {
      const query = {};
      if (isActive !== undefined) query.isActive = isActive === 'true';
      if (isTodaySpecial !== undefined) query.isTodaySpecial = isTodaySpecial === 'true';

      let dishes = SpecialDish.find(query).sort({ displayOrder: 1, createdAt: -1 });
      if (limit) dishes = dishes.limit(parseInt(limit));

      const result = await dishes;
      return result;
    } catch (error) {
      logger.error(`Get all specials error: ${error.message}`);
      throw error;
    }
  }

  // Get today's specials (max 3, active)
  async getTodaySpecials() {
    try {
      const dishes = await SpecialDish.find({
        isTodaySpecial: true,
        isActive: true,
      })
        .sort({ displayOrder: 1 })
        .limit(3);
      return dishes;
    } catch (error) {
      logger.error(`Get today's specials error: ${error.message}`);
      throw error;
    }
  }

  // Create special dish (admin)
  async createSpecial(data) {
    try {
      const dish = await SpecialDish.create(data);
      logger.info(`Special dish created: ${dish.name}`);
      return dish;
    } catch (error) {
      logger.error(`Create special error: ${error.message}`);
      throw error;
    }
  }

  // Update special dish (admin)
  async updateSpecial(id, data) {
    try {
      const dish = await SpecialDish.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      if (!dish) throw new AppError('Special dish not found', 404);
      logger.info(`Special dish updated: ${dish.name}`);
      return dish;
    } catch (error) {
      logger.error(`Update special error: ${error.message}`);
      throw error;
    }
  }

  // Delete special dish (admin) - soft delete
  async deleteSpecial(id) {
    try {
      const dish = await SpecialDish.findByIdAndUpdate(id, { isActive: false }, { new: true });
      if (!dish) throw new AppError('Special dish not found', 404);
      logger.info(`Special dish deleted: ${dish.name}`);
      return dish;
    } catch (error) {
      logger.error(`Delete special error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new SpecialService();