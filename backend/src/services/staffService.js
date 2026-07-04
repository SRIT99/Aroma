const Staff = require("../models/Staff");
const Order = require("../models/Order");
const { AppError } = require("../middleware/errorHandler");
const logger = require("../utils/logger");

class StaffService {
  // Get staff profile
  async getStaffProfile(staffId) {
    try {
      const staff = await Staff.findById(staffId).populate(
        "createdBy",
        "name email",
      );

      if (!staff) {
        throw new AppError("Staff not found", 404);
      }

      return staff;
    } catch (error) {
      logger.error(`Get staff profile error: ${error.message}`);
      throw error;
    }
  }

  // Update staff profile (self)
  async updateProfile(staffId, updateData) {
    try {
      // Remove fields that shouldn't be updated by staff
      delete updateData.role;
      delete updateData.createdBy;
      delete updateData.employeeId;
      delete updateData.permissions;

      const staff = await Staff.findByIdAndUpdate(staffId, updateData, {
        new: true,
        runValidators: true,
      });

      if (!staff) {
        throw new AppError("Staff not found", 404);
      }

      logger.info(`Staff profile updated: ${staff.email}`);
      return staff;
    } catch (error) {
      logger.error(`Update staff profile error: ${error.message}`);
      throw error;
    }
  }

  // Get orders assigned to staff
  async getAssignedOrders(staffId, status = null) {
    try {
      const query = { assignedTo: staffId };
      if (status) {
        query.status = status;
      }

      const orders = await Order.find(query)
        .populate("customer", "name phone email")
        .sort({ createdAt: -1 });

      return orders;
    } catch (error) {
      logger.error(`Get assigned orders error: ${error.message}`);
      throw error;
    }
  }

  // Update order status (for delivery staff)
  async updateOrderStatus(staffId, orderId, status) {
    try {
      const order = await Order.findById(orderId);

      if (!order) {
        throw new AppError("Order not found", 404);
      }

      // Check if staff is assigned to this order
      if (order.assignedTo.toString() !== staffId.toString()) {
        throw new AppError("Not authorized to update this order", 403);
      }

      order.status = status;
      order.updatedAt = new Date();

      // Add status history
      order.statusHistory = order.statusHistory || [];
      order.statusHistory.push({
        status,
        updatedBy: staffId,
        timestamp: new Date(),
        note: `Status updated by staff`,
      });

      await order.save();

      logger.info(
        `Order status updated: ${orderId} -> ${status} by staff ${staffId}`,
      );
      return order;
    } catch (error) {
      logger.error(`Update order status error: ${error.message}`);
      throw error;
    }
  }

  // Get staff availability
  async updateAvailability(staffId, isAvailable) {
    try {
      const staff = await Staff.findByIdAndUpdate(
        staffId,
        { isAvailable },
        { new: true },
      );

      if (!staff) {
        throw new AppError("Staff not found", 404);
      }

      logger.info(
        `Staff availability updated: ${staff.email} -> ${isAvailable}`,
      );
      return staff;
    } catch (error) {
      logger.error(`Update availability error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new StaffService();
