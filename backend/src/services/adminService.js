const Admin = require("../models/Admin");
const Staff = require("../models/Staff");
const Customer = require("../models/Customer");
const User = require("../models/User");
const { AppError } = require("../middleware/errorHandler");
const logger = require("../utils/logger");

class AdminService {
  // Create admin (only called from script)
  async createAdmin(userData) {
    try {
      const admin = await Admin.create({
        ...userData,
        role: "admin",
        adminLevel: "super_admin",
        isVerified: true,
      });

      logger.info(`Admin created: ${admin.email}`);
      return admin;
    } catch (error) {
      logger.error(`Create admin error: ${error.message}`);
      throw error;
    }
  }

  // Get all users with pagination
  async getAllUsers(page = 1, limit = 10, filters = {}) {
    try {
      const skip = (page - 1) * limit;
      const query = { ...filters };

      const users = await User.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await User.countDocuments(query);

      return {
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error(`Get all users error: ${error.message}`);
      throw error;
    }
  }

  // Create staff member (admin only)
  async createStaff(staffData, createdBy) {
    try {
      // Check if user exists
      const existingUser = await User.findOne({
        $or: [{ email: staffData.email }, { phone: staffData.phone }],
      });

      if (existingUser) {
        throw new AppError("User already exists with this email or phone", 409);
      }

      // Create staff
      const staff = await Staff.create({
        ...staffData,
        role: "staff",
        createdBy,
        isVerified: true,
      });

      // Generate employee ID
      await staff.generateEmployeeId();

      logger.info(`Staff created: ${staff.email} by admin ${createdBy}`);
      return staff;
    } catch (error) {
      logger.error(`Create staff error: ${error.message}`);
      throw error;
    }
  }

  // Get all staff members
  async getAllStaff(page = 1, limit = 10, filters = {}) {
    try {
      const skip = (page - 1) * limit;
      const query = { role: "staff", ...filters };

      const staff = await Staff.find(query)
        .populate("createdBy", "name email")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await Staff.countDocuments(query);

      return {
        staff,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error(`Get all staff error: ${error.message}`);
      throw error;
    }
  }

  // Update staff member
  async updateStaff(staffId, updateData) {
    try {
      const staff = await Staff.findByIdAndUpdate(staffId, updateData, {
        new: true,
        runValidators: true,
      });

      if (!staff) {
        throw new AppError("Staff not found", 404);
      }

      logger.info(`Staff updated: ${staff.email}`);
      return staff;
    } catch (error) {
      logger.error(`Update staff error: ${error.message}`);
      throw error;
    }
  }

  // Delete staff member (soft delete)
  async deleteStaff(staffId) {
    try {
      const staff = await Staff.findByIdAndUpdate(
        staffId,
        { isActive: false },
        { new: true },
      );

      if (!staff) {
        throw new AppError("Staff not found", 404);
      }

      logger.info(`Staff deleted: ${staff.email}`);
      return staff;
    } catch (error) {
      logger.error(`Delete staff error: ${error.message}`);
      throw error;
    }
  }

  // Get user by ID
  async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new AppError("User not found", 404);
      }
      return user;
    } catch (error) {
      logger.error(`Get user error: ${error.message}`);
      throw error;
    }
  }

  // Activate/deactivate user
  async toggleUserStatus(userId, isActive) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { isActive },
        { new: true },
      );

      if (!user) {
        throw new AppError("User not found", 404);
      }

      logger.info(`User status updated: ${user.email} -> ${isActive}`);
      return user;
    } catch (error) {
      logger.error(`Toggle user status error: ${error.message}`);
      throw error;
    }
  }

  // Get dashboard stats
  async getDashboardStats() {
    try {
      const [totalUsers, totalCustomers, totalStaff, totalAdmins, activeUsers] =
        await Promise.all([
          User.countDocuments(),
          Customer.countDocuments(),
          Staff.countDocuments(),
          Admin.countDocuments(),
          User.countDocuments({ isActive: true }),
        ]);

      return {
        totalUsers,
        totalCustomers,
        totalStaff,
        totalAdmins,
        activeUsers,
        inactiveUsers: totalUsers - activeUsers,
      };
    } catch (error) {
      logger.error(`Get dashboard stats error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new AdminService();
