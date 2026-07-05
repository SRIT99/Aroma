const MenuService = require("../services/menuService");
const { AppError } = require("../middleware/errorHandler");
const logger = require("../utils/logger");

class MenuController {
  // Get all menu items (public)
  async getAllMenu(req, res, next) {
    try {
      const { page = 1, limit = 10, category, search } = req.query;
      const result = await MenuService.getAllMenu({
        page: parseInt(page),
        limit: parseInt(limit),
        category,
        search,
      });
      res.json({
        success: true,
        data: result.items,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get menu by category (public)
  async getMenuByCategory(req, res, next) {
    try {
      const { category } = req.params;
      const items = await MenuService.getMenuByCategory(category);
      res.json({
        success: true,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get special/popular items (public)
  async getSpecialItems(req, res, next) {
    try {
      const items = await MenuService.getSpecialItems();
      res.json({
        success: true,
        data: items,
      });
    } catch (error) {
      next(error);
    }
  }

  // Search menu (public)
  async searchMenu(req, res, next) {
    try {
      const { q } = req.query;
      if (!q) {
        throw new AppError("Search query is required", 400);
      }
      const results = await MenuService.searchMenu(q);
      res.json({
        success: true,
        data: results,
      });
    } catch (error) {
      next(error);
    }
  }

  // Create menu item (admin only)
  async createMenuItem(req, res, next) {
    try {
      const menuData = req.body;
      if (req.file) {
        menuData.image = req.file.cloudinaryUrl || req.file.path;
      }
      const item = await MenuService.createMenuItem(menuData);
      res.status(201).json({
        success: true,
        message: "Menu item created successfully",
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update menu item (admin only)
  async updateMenuItem(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      if (req.file) {
        updateData.image = req.file.cloudinaryUrl || req.file.path;
      }
      const item = await MenuService.updateMenuItem(id, updateData);
      res.json({
        success: true,
        message: "Menu item updated successfully",
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete menu item (admin only)
  async deleteMenuItem(req, res, next) {
    try {
      const { id } = req.params;
      await MenuService.deleteMenuItem(id);
      res.json({
        success: true,
        message: "Menu item deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MenuController();
