const SpecialService = require("../services/specialService");
const { AppError } = require("../middleware/errorHandler");

class SpecialController {
  // Get all specials (public)
  async getAllSpecials(req, res, next) {
    try {
      const { isActive, isTodaySpecial, limit } = req.query;
      const dishes = await SpecialService.getAllSpecials({
        isActive,
        isTodaySpecial,
        limit,
      });
      res.json({ success: true, data: dishes });
    } catch (error) {
      next(error);
    }
  }

  // Get today's specials (public)
  async getTodaySpecials(req, res, next) {
    try {
      const dishes = await SpecialService.getTodaySpecials();
      res.json({ success: true, data: dishes });
    } catch (error) {
      next(error);
    }
  }

  // Create special (admin only)
  async createSpecial(req, res, next) {
    try {
      const data = req.body;
      if (req.file) data.image = req.file.cloudinaryUrl || req.file.path;
      const dish = await SpecialService.createSpecial(data);
      res.status(201).json({
        success: true,
        message: "Special dish created",
        data: dish,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update special (admin only)
  async updateSpecial(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      if (req.file) data.image = req.file.cloudinaryUrl || req.file.path;
      const dish = await SpecialService.updateSpecial(id, data);
      res.json({
        success: true,
        message: "Special dish updated",
        data: dish,
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete special (admin only)
  async deleteSpecial(req, res, next) {
    try {
      const { id } = req.params;
      await SpecialService.deleteSpecial(id);
      res.json({
        success: true,
        message: "Special dish deleted",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SpecialController();
