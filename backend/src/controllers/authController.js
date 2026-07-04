const AuthService = require("../services/authService");
const { AppError } = require("../middleware/errorHandler");
const logger = require("../utils/logger");

class AuthController {
  // Register new customer
  async register(req, res, next) {
    try {
      const { name, email, phone, password } = req.body;

      const result = await AuthService.registerCustomer({
        name,
        email,
        phone,
        password,
      });

      res.status(201).json({
        success: true,
        message: "Registration successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  // Login user
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await AuthService.loginUser(email, password);

      res.json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  // Get user profile
  async getProfile(req, res, next) {
    try {
      const user = req.user;

      res.json({
        success: true,
        data: user.getPublicProfile(),
      });
    } catch (error) {
      next(error);
    }
  }

  // Update user profile
  async updateProfile(req, res, next) {
    try {
      const { name, phone } = req.body;
      const userId = req.user._id;

      const user = await User.findByIdAndUpdate(
        userId,
        { name, phone },
        { new: true, runValidators: true },
      );

      res.json({
        success: true,
        message: "Profile updated successfully",
        data: user.getPublicProfile(),
      });
    } catch (error) {
      next(error);
    }
  }

  // Change password
  async changePassword(req, res, next) {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user._id;

      const result = await AuthService.changePassword(
        userId,
        oldPassword,
        newPassword,
      );

      res.json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }

  // Logout
  async logout(req, res, next) {
    try {
      // In JWT-based auth, logout is handled client-side
      // We just send a success response
      res.json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
