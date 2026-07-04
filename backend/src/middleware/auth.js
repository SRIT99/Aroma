const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/config");
const logger = require("../utils/logger");

// Protect routes - verify JWT token
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, config.jwt.secret);

      // Get user from token
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: "Account is deactivated",
        });
      }

      // Add user to request
      req.user = user;
      req.userId = user._id;
      req.userRole = user.role;

      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired",
        });
      }
      throw error;
    }
  } catch (error) {
    logger.error(`Auth error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

// Authorize roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};

// Admin only middleware
const admin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }
    next();
  } catch (error) {
    logger.error(`Admin auth error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Authorization failed",
    });
  }
};

// Staff only middleware
const staff = async (req, res, next) => {
  try {
    if (!["admin", "staff"].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Staff access required",
      });
    }
    next();
  } catch (error) {
    logger.error(`Staff auth error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Authorization failed",
    });
  }
};

// Customer only middleware
const customer = async (req, res, next) => {
  try {
    if (req.user.role !== "customer") {
      return res.status(403).json({
        success: false,
        message: "Customer access required",
      });
    }
    next();
  } catch (error) {
    logger.error(`Customer auth error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Authorization failed",
    });
  }
};

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

module.exports = {
  protect,
  authorize,
  admin,
  staff,
  customer,
  generateToken,
};
