const Staff = require("../models/Staff");
const Order = require("../models/Order");
const { AppError } = require("../middleware/errorHandler");
const logger = require("../utils/logger");

class StaffController {
  // Get staff profile
  async getProfile(req, res, next) {
    try {
      const staff = await Staff.findById(req.user._id)
        .populate("createdBy", "name email")
        .select("-password");

      if (!staff) {
        throw new AppError("Staff not found", 404);
      }

      res.json({
        success: true,
        data: staff,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update staff profile (self)
  async updateProfile(req, res, next) {
    try {
      const allowedUpdates = ["name", "phone", "profileImage", "shift"];
      const updates = {};

      Object.keys(req.body).forEach((key) => {
        if (allowedUpdates.includes(key)) {
          updates[key] = req.body[key];
        }
      });

      const staff = await Staff.findByIdAndUpdate(req.user._id, updates, {
        new: true,
        runValidators: true,
      }).select("-password");

      if (!staff) {
        throw new AppError("Staff not found", 404);
      }

      logger.info(`Staff profile updated: ${staff.email}`);
      res.json({
        success: true,
        message: "Profile updated successfully",
        data: staff,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get assigned orders
  async getAssignedOrders(req, res, next) {
    try {
      const { status, page = 1, limit = 10 } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);

      const query = { assignedTo: req.user._id };
      if (status) {
        query.status = status;
      }

      const orders = await Order.find(query)
        .populate("customer", "name phone email")
        .populate("items.menuItem", "name image")
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });

      const total = await Order.countDocuments(query);

      res.json({
        success: true,
        data: orders,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // Update order status (for delivery/kitchen staff)
  async updateOrderStatus(req, res, next) {
    try {
      const { orderId } = req.params;
      const { status, note } = req.body;

      const validStatuses = [
        "confirmed",
        "preparing",
        "ready",
        "out_for_delivery",
        "delivered",
      ];
      if (!validStatuses.includes(status)) {
        throw new AppError("Invalid status", 400);
      }

      const order = await Order.findById(orderId);
      if (!order) {
        throw new AppError("Order not found", 404);
      }

      // Check if staff is assigned to this order
      if (
        order.assignedTo &&
        order.assignedTo.toString() !== req.user._id.toString()
      ) {
        throw new AppError("Not authorized to update this order", 403);
      }

      order.status = status;
      order.updatedAt = new Date();

      // Add to status history
      order.statusHistory = order.statusHistory || [];
      order.statusHistory.push({
        status,
        updatedBy: req.user._id,
        timestamp: new Date(),
        note: note || `Status updated by staff`,
      });

      // If delivered, update actual time
      if (status === "delivered") {
        order.actualTime = new Date();
      }

      await order.save();

      logger.info(
        `Order ${order.orderNumber} status updated to ${status} by staff ${req.user.email}`,
      );
      res.json({
        success: true,
        message: "Order status updated successfully",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update staff availability
  async updateAvailability(req, res, next) {
    try {
      const { isAvailable } = req.body;

      const staff = await Staff.findByIdAndUpdate(
        req.user._id,
        { isAvailable },
        { new: true },
      ).select("-password");

      if (!staff) {
        throw new AppError("Staff not found", 404);
      }

      logger.info(
        `Staff availability updated: ${staff.email} -> ${isAvailable}`,
      );
      res.json({
        success: true,
        message: `Availability updated to ${isAvailable ? "available" : "unavailable"}`,
        data: { isAvailable: staff.isAvailable },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StaffController();
