const CustomerService = require("../services/customerService");
const { AppError } = require("../middleware/errorHandler");
const logger = require("../utils/logger");

class CustomerController {
  // Get customer profile
  async getProfile(req, res, next) {
    try {
      const customer = await CustomerService.getCustomerProfile(req.user._id);
      res.json({
        success: true,
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update customer profile
  async updateProfile(req, res, next) {
    try {
      const customer = await CustomerService.updateProfile(
        req.user._id,
        req.body,
      );
      res.json({
        success: true,
        message: "Profile updated successfully",
        data: customer,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get customer orders
  async getOrders(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await CustomerService.getCustomerOrders(
        req.user._id,
        parseInt(page),
        parseInt(limit),
      );
      res.json({
        success: true,
        data: result.orders,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get loyalty info
  async getLoyaltyInfo(req, res, next) {
    try {
      const loyalty = await CustomerService.getLoyaltyInfo(req.user._id);
      res.json({
        success: true,
        data: loyalty,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get addresses
  async getAddresses(req, res, next) {
    try {
      const customer = await CustomerService.getCustomerProfile(req.user._id);
      res.json({
        success: true,
        data: customer.addresses || [],
      });
    } catch (error) {
      next(error);
    }
  }

  // Add address
  async addAddress(req, res, next) {
    try {
      const addresses = await CustomerService.addAddress(
        req.user._id,
        req.body,
      );
      res.status(201).json({
        success: true,
        message: "Address added successfully",
        data: addresses,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update address
  async updateAddress(req, res, next) {
    try {
      const { index } = req.params;
      const addresses = await CustomerService.updateAddress(
        req.user._id,
        parseInt(index),
        req.body,
      );
      res.json({
        success: true,
        message: "Address updated successfully",
        data: addresses,
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete address
  async deleteAddress(req, res, next) {
    try {
      const { index } = req.params;
      const addresses = await CustomerService.deleteAddress(
        req.user._id,
        parseInt(index),
      );
      res.json({
        success: true,
        message: "Address deleted successfully",
        data: addresses,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get favorites
  async getFavorites(req, res, next) {
    try {
      const customer = await CustomerService.getCustomerProfile(req.user._id);
      res.json({
        success: true,
        data: customer.preferences?.favoriteItems || [],
      });
    } catch (error) {
      next(error);
    }
  }

  // Add favorite
  async addFavorite(req, res, next) {
    try {
      const { menuItemId } = req.params;
      const favorites = await CustomerService.addFavorite(
        req.user._id,
        menuItemId,
      );
      res.json({
        success: true,
        message: "Added to favorites",
        data: favorites,
      });
    } catch (error) {
      next(error);
    }
  }

  // Remove favorite
  async removeFavorite(req, res, next) {
    try {
      const { menuItemId } = req.params;
      const favorites = await CustomerService.removeFavorite(
        req.user._id,
        menuItemId,
      );
      res.json({
        success: true,
        message: "Removed from favorites",
        data: favorites,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CustomerController();
