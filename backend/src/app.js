const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const path = require("path");

const config = require("./config/config");
const Database = require("./config/database");
const { errorHandler } = require("./middleware/errorHandler");
const logger = require("./utils/logger");

// Import routes
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const staffRoutes = require("./routes/staffRoutes");
const customerRoutes = require("./routes/customerRoutes");
const menuRoutes = require("./routes/menuRoutes");
const heroRoutes = require("./routes/heroRoutes");
const specialRoutes = require("./routes/specialRoutes");
const orderRoutes = require("./routes/orderRoutes");

class App {
  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  setupMiddleware() {
    // Security
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: config.frontend.url,
        credentials: true,
      }),
    );

    // Compression
    this.app.use(compression());

    // Rate limiting
    const limiter = rateLimit({
      windowMs: config.security.rateLimit.windowMs,
      max: config.security.rateLimit.max,
      message: {
        success: false,
        message: "Too many requests, please try again later.",
      },
    });
    this.app.use("/api", limiter);

    // Body parsing
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    // Static files
    this.app.use("/uploads", express.static(config.upload.path));

    // Logging
    if (config.env === "development") {
      this.app.use(morgan("dev"));
    } else {
      this.app.use(morgan("combined"));
    }

    // Request logging
    this.app.use((req, res, next) => {
      logger.info(`📥 ${req.method} ${req.url}`);
      next();
    });

    // Health check
    this.app.get("/health", (req, res) => {
      const dbStatus = Database.getStatus();
      res.json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        environment: config.env,
        database: dbStatus,
      });
    });
  }

  setupRoutes() {
    // API routes
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/admin", adminRoutes);
    this.app.use("/api/staff", staffRoutes);
    this.app.use("/api/customer", customerRoutes);
    this.app.use("/api/menu", menuRoutes);
    this.app.use("/api/hero", heroRoutes);
    this.app.use("/api/specials", specialRoutes);
    this.app.use("/api/orders", orderRoutes);

    // 404 handler
    this.app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.url} not found`,
      });
    });
  }

  setupErrorHandling() {
    this.app.use(errorHandler);
  }

  async start() {
    try {
      // Connect to database
      await Database.connect();

      // Start server
      const port = config.port;
      this.server = this.app.listen(port, () => {
        console.log("\n🚀 AROMA RESTAURANT BACKEND");
        console.log("============================");
        console.log(`✅ Server running on port ${port}`);
        console.log(`🌐 Environment: ${config.env}`);
        console.log(`📊 Database: ${Database.getStatus().database}`);
        console.log("============================\n");
      });

      // Graceful shutdown
      process.on("SIGTERM", () => this.shutdown());
      process.on("SIGINT", () => this.shutdown());
    } catch (error) {
      logger.error(`❌ Failed to start server: ${error.message}`);
      process.exit(1);
    }
  }

  async shutdown() {
    logger.info("🛑 Shutting down gracefully...");

    // Close server
    if (this.server) {
      this.server.close(async () => {
        logger.info("✅ HTTP server closed");
        await Database.disconnect();
        process.exit(0);
      });
    } else {
      await Database.disconnect();
      process.exit(0);
    }

    // Force shutdown after 10 seconds
    setTimeout(() => {
      logger.warn("⚠️ Force shutdown after timeout");
      process.exit(1);
    }, 10000);
  }
}

module.exports = App;
