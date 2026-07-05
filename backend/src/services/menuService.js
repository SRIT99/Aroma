const Menu = require("../models/Menu");
const { AppError } = require("../middleware/errorHandler");
const logger = require("../utils/logger");

class MenuService {
  // Get all menu items with pagination and filters
  async getAllMenu({ page = 1, limit = 10, category, search }) {
    try {
      const skip = (page - 1) * limit;
      const query = { isActive: true };

      if (category && category !== "all") {
        query.category = category;
      }

      if (search) {
        query.$text = { $search: search };
      }

      const [items, total] = await Promise.all([
        Menu.find(query).skip(skip).limit(limit).sort({ category: 1, name: 1 }),
        Menu.countDocuments(query),
      ]);

      return {
        items,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error(`Get all menu error: ${error.message}`);
      throw error;
    }
  }

  // Get menu by category
  async getMenuByCategory(category) {
    try {
      const items = await Menu.find({
        category,
        isActive: true,
      }).sort({ name: 1 });

      return items;
    } catch (error) {
      logger.error(`Get menu by category error: ${error.message}`);
      throw error;
    }
  }

  // Get special/popular items
  async getSpecialItems() {
    try {
      const items = await Menu.find({
        isPopular: true,
        isActive: true,
      }).limit(10);

      return items;
    } catch (error) {
      logger.error(`Get special items error: ${error.message}`);
      throw error;
    }
  }

  // Search menu items
  async searchMenu(query) {
    try {
      const items = await Menu.find(
        {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { tags: { $regex: query, $options: "i" } },
          ],
          isActive: true,
        },
        {
          score: { $meta: "textScore" },
        },
      )
        .sort({ score: { $meta: "textScore" } })
        .limit(20);

      return items;
    } catch (error) {
      logger.error(`Search menu error: ${error.message}`);
      throw error;
    }
  }

  // Create menu item (admin)
  async createMenuItem(menuData) {
    try {
      // Check if item with same name exists
      const existing = await Menu.findOne({
        name: { $regex: new RegExp(`^${menuData.name}$`, "i") },
      });

      if (existing) {
        throw new AppError("Menu item with this name already exists", 409);
      }

      const menuItem = await Menu.create(menuData);
      logger.info(`Menu item created: ${menuItem.name}`);
      return menuItem;
    } catch (error) {
      logger.error(`Create menu item error: ${error.message}`);
      throw error;
    }
  }

  // Update menu item (admin)
  async updateMenuItem(id, updateData) {
    try {
      const menuItem = await Menu.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!menuItem) {
        throw new AppError("Menu item not found", 404);
      }

      logger.info(`Menu item updated: ${menuItem.name}`);
      return menuItem;
    } catch (error) {
      logger.error(`Update menu item error: ${error.message}`);
      throw error;
    }
  }

  // Delete menu item (admin) - soft delete
  async deleteMenuItem(id) {
    try {
      const menuItem = await Menu.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true },
      );

      if (!menuItem) {
        throw new AppError("Menu item not found", 404);
      }

      logger.info(`Menu item deleted: ${menuItem.name}`);
      return menuItem;
    } catch (error) {
      logger.error(`Delete menu item error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new MenuService();
