const AdminService = require("../services/adminService");
const { AppError } = require("../middleware/errorHandler");
const logger = require("../utils/logger");

class AdminController {
  // Dashboard stats
  async getDashboardStats(req, res, next) {
    try {
      const stats = await AdminService.getDashboardStats();

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all users
  async getAllUsers(req, res, next) {
    try {
      const { page = 1, limit = 10, role, isActive } = req.query;

      const filters = {};
      if (role) filters.role = role;
      if (isActive !== undefined) filters.isActive = isActive === "true";

      const result = await AdminService.getAllUsers(
        parseInt(page),
        parseInt(limit),
        filters,
      );

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get user by ID
  async getUserById(req, res, next) {
    try {
      const { id } = req.params;

      const user = await AdminService.getUserById(id);

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  // Toggle user status
  async toggleUserStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { isActive } = req.body;

      const user = await AdminService.toggleUserStatus(id, isActive);

      res.json({
        success: true,
        message: `User ${isActive ? "activated" : "deactivated"} successfully`,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  // Create staff
  async createStaff(req, res, next) {
    try {
      const staffData = req.body;
      const createdBy = req.user._id;

      const staff = await AdminService.createStaff(staffData, createdBy);

      res.status(201).json({
        success: true,
        message: "Staff created successfully",
        data: staff,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all staff
  async getAllStaff(req, res, next) {
    try {
      const { page = 1, limit = 10, position, department } = req.query;

      const filters = {};
      if (position) filters.position = position;
      if (department) filters.department = department;

      const result = await AdminService.getAllStaff(
        parseInt(page),
        parseInt(limit),
        filters,
      );

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get staff by ID
  async getStaffById(req, res, next) {
    try {
      const { id } = req.params;

      const staff = await AdminService.getUserById(id);

      res.json({
        success: true,
        data: staff,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update staff
  async updateStaff(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const staff = await AdminService.updateStaff(id, updateData);

      res.json({
        success: true,
        message: "Staff updated successfully",
        data: staff,
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete staff
  async deleteStaff(req, res, next) {
    try {
      const { id } = req.params;

      const staff = await AdminService.deleteStaff(id);

      res.json({
        success: true,
        message: "Staff deleted successfully",
        data: staff,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get settings
  async getSettings(req, res, next) {
    try {
      // Only super admin can access settings
      if (req.user.adminLevel !== "super_admin") {
        throw new AppError("Super admin access required", 403);
      }

      // Return system settings
      res.json({
        success: true,
        data: {
          // Add settings here
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Update settings
  async updateSettings(req, res, next) {
    try {
      // Only super admin can update settings
      if (req.user.adminLevel !== "super_admin") {
        throw new AppError("Super admin access required", 403);
      }

      // Update system settings
      res.json({
        success: true,
        message: "Settings updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();
