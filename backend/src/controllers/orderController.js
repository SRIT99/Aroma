const OrderService = require("../services/orderService");
const { AppError } = require("../middleware/errorHandler");

class OrderController {
  // Create order (customer)
  async createOrder(req, res, next) {
    try {
      const orderData = req.body;
      orderData.customer = req.user._id;
      const order = await OrderService.createOrder(orderData);
      res.status(201).json({
        success: true,
        message: "Order placed successfully",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all orders (admin/staff)
  async getAllOrders(req, res, next) {
    try {
      const { page = 1, limit = 10, status } = req.query;
      const result = await OrderService.getAllOrders({
        page: parseInt(page),
        limit: parseInt(limit),
        status,
      });
      res.json({
        success: true,
        data: result.orders,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get order by ID (customer/admin/staff)
  async getOrderById(req, res, next) {
    try {
      const { id } = req.params;
      const order = await OrderService.getOrderById(id);
      // Customer can only see their own orders
      if (
        req.user.role === "customer" &&
        order.customer._id.toString() !== req.user._id.toString()
      ) {
        throw new AppError("Not authorized", 403);
      }
      res.json({ success: true, data: order });
    } catch (error) {
      next(error);
    }
  }

  // Update order status (admin/staff)
  async updateOrderStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status, note } = req.body;
      const order = await OrderService.updateOrderStatus(
        id,
        status,
        req.user._id,
        note,
      );
      res.json({
        success: true,
        message: "Order status updated",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  // Cancel order (customer)
  async cancelOrder(req, res, next) {
    try {
      const { id } = req.params;
      const order = await OrderService.cancelOrder(id, req.user._id);
      res.json({
        success: true,
        message: "Order cancelled",
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
