const User = require("../models/User");
const Customer = require("../models/Customer");
const Admin = require("../models/Admin");
const Staff = require("../models/Staff");
const { generateToken } = require("../middleware/auth");
const { AppError } = require("../middleware/errorHandler");
const logger = require("../utils/logger");

class AuthService {
  // Register new customer
  async registerCustomer(userData) {
    try {
      // Check if user exists
      const existingUser = await User.findOne({
        $or: [{ email: userData.email }, { phone: userData.phone }],
      });

      if (existingUser) {
        throw new AppError("User already exists with this email or phone", 409);
      }

      // Create customer
      const customer = await Customer.create({
        ...userData,
        role: "customer",
      });

      // Generate referral code
      await customer.generateReferralCode();

      // Generate token
      const token = generateToken(customer._id);

      return {
        user: customer.getPublicProfile(),
        token,
        loyaltyPoints: customer.loyaltyPoints,
        loyaltyTier: customer.loyaltyTier,
      };
    } catch (error) {
      logger.error(`Registration error: ${error.message}`);
      throw error;
    }
  }

  // Login user
  async loginUser(email, password) {
    try {
      // Find user with password field
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        throw new AppError("Invalid credentials", 401);
      }

      // Check if user is active
      if (!user.isActive) {
        throw new AppError("Account is deactivated", 401);
      }

      // Verify password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new AppError("Invalid credentials", 401);
      }

      // Update last login
      await user.updateLastLogin();

      // Generate token
      const token = generateToken(user._id);

      // Get user profile based on role
      let profile = user.getPublicProfile();

      // Add role-specific data
      if (user.role === "customer") {
        const customer = await Customer.findById(user._id);
        profile = {
          ...profile,
          loyaltyPoints: customer.loyaltyPoints,
          loyaltyTier: customer.loyaltyTier,
          totalOrders: customer.totalOrders,
        };
      }

      return {
        user: profile,
        token,
        role: user.role,
      };
    } catch (error) {
      logger.error(`Login error: ${error.message}`);
      throw error;
    }
  }

  // Verify token
  async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, config.jwt.secret);
      const user = await User.findById(decoded.id);

      if (!user || !user.isActive) {
        throw new AppError("Invalid token", 401);
      }

      return user;
    } catch (error) {
      throw new AppError("Invalid or expired token", 401);
    }
  }

  // Change password
  async changePassword(userId, oldPassword, newPassword) {
    try {
      const user = await User.findById(userId).select("+password");

      if (!user) {
        throw new AppError("User not found", 404);
      }

      const isMatch = await user.comparePassword(oldPassword);
      if (!isMatch) {
        throw new AppError("Current password is incorrect", 401);
      }

      user.password = newPassword;
      await user.save();

      return { message: "Password updated successfully" };
    } catch (error) {
      logger.error(`Change password error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new AuthService();
