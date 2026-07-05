const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Menu = require('../models/Menu');
const { AppError } = require('../middleware/errorHandler');
const logger = require('../utils/logger');

class OrderService {
  // Create new order
  async createOrder(orderData) {
    try {
      const { customer, items, orderType, paymentMethod, deliveryAddress, notes } = orderData;

      // Validate items and calculate totals
      let subtotal = 0;
      const processedItems = [];

      for (const item of items) {
        const menuItem = await Menu.findById(item.menuItemId);
        if (!menuItem) {
          throw new AppError(`Menu item ${item.menuItemId} not found`, 404);
        }

        const price = menuItem.discountedPrice || menuItem.price;
        const totalPrice = price * item.quantity;
        subtotal += totalPrice;

        processedItems.push({
          menuItem: menuItem._id,
          name: menuItem.name,
          quantity: item.quantity,
          price: price,
          totalPrice,
          specialInstructions: item.specialInstructions || '',
          options: item.options || [],
        });
      }

      // Calculate charges
      const deliveryFee = orderType === 'delivery' ? 50 : 0;
      const serviceCharge = subtotal * 0.05; // 5% service charge
      const tax = subtotal * 0.13; // 13% VAT
      const discount = 0; // Will add discount logic later
      const totalAmount = subtotal + deliveryFee + serviceCharge + tax - discount;

      const order = await Order.create({
        customer,
        items: processedItems,
        subtotal,
        discount,
        deliveryFee,
        serviceCharge,
        tax,
        totalAmount,
        orderType,
        paymentMethod,
        deliveryAddress,
        notes,
        status: 'pending',
        paymentStatus: 'pending',
        statusHistory: [
          {
            status: 'pending',
            updatedBy: customer,
            timestamp: new Date(),
            note: 'Order placed',
          },
        ],
      });

      // Update customer's total orders and spent
      await Customer.findByIdAndUpdate(customer, {
        $inc: { totalOrders: 1, totalSpent: totalAmount },
      });

      logger.info(`Order created: ${order.orderNumber} by ${customer}`);
      return order;
    } catch (error) {
      logger.error(`Create order error: ${error.message}`);
      throw error;
    }
  }

  // Get all orders with pagination (admin/staff)
  async getAllOrders({ page = 1, limit = 10, status }) {
    try {
      const skip = (page - 1) * limit;
      const query = {};
      if (status) query.status = status;

      const [orders, total] = await Promise.all([
        Order.find(query)
          .populate('customer', 'name email phone')
          .populate('assignedTo', 'name')
          .populate('items.menuItem', 'name image')
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: -1 }),
        Order.countDocuments(query),
      ]);

      return {
        orders,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      logger.error(`Get all orders error: ${error.message}`);
      throw error;
    }
  }

  // Get order by ID
  async getOrderById(id) {
    try {
      const order = await Order.findById(id)
        .populate('customer', 'name email phone')
        .populate('assignedTo', 'name')
        .populate('items.menuItem', 'name image price');

      if (!order) {
        throw new AppError('Order not found', 404);
      }

      return order;
    } catch (error) {
      logger.error(`Get order by ID error: ${error.message}`);
      throw error;
    }
  }

  // Update order status
  async updateOrderStatus(orderId, status, updatedBy, note = '') {
    try {
      const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled'];
      if (!validStatuses.includes(status)) {
        throw new AppError('Invalid status', 400);
      }

      const order = await Order.findById(orderId);
      if (!order) {
        throw new AppError('Order not found', 404);
      }

      // Don't allow status changes on delivered or cancelled orders
      if (['delivered', 'cancelled'].includes(order.status)) {
        throw new AppError(`Cannot change status of ${order.status} order`, 400);
      }

      order.status = status;
      order.statusHistory.push({
        status,
        updatedBy,
        timestamp: new Date(),
        note,
      });

      // If status is delivered, mark payment as paid
      if (status === 'delivered') {
        order.paymentStatus = 'paid';
      }

      await order.save();

      logger.info(`Order ${order.orderNumber} status updated to ${status}`);
      return order;
    } catch (error) {
      logger.error(`Update order status error: ${error.message}`);
      throw error;
    }
  }

  // Cancel order (customer)
  async cancelOrder(orderId, customerId) {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new AppError('Order not found', 404);
      }

      // Check if order belongs to customer
      if (order.customer.toString() !== customerId.toString()) {
        throw new AppError('Not authorized to cancel this order', 403);
      }

      // Can only cancel pending or confirmed orders
      if (!['pending', 'confirmed'].includes(order.status)) {
        throw new AppError(`Cannot cancel ${order.status} order`, 400);
      }

      order.status = 'cancelled';
      order.statusHistory.push({
        status: 'cancelled',
        updatedBy: customerId,
        timestamp: new Date(),
        note: 'Cancelled by customer',
      });

      await order.save();

      logger.info(`Order ${order.orderNumber} cancelled by customer`);
      return order;
    } catch (error) {
      logger.error(`Cancel order error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new OrderService();