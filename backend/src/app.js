const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const path = require("path");
const fs = require("fs");

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
    this.app.use(limiter);

    // Body parsing
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    // Static files - Serve uploads directory
    const uploadsPath = path.join(__dirname, "../uploads");

    // Ensure uploads directory exists
    if (!fs.existsSync(uploadsPath)) {
      fs.mkdirSync(uploadsPath, { recursive: true });
      logger.info(`📁 Created uploads directory: ${uploadsPath}`);
    }

    // Create subdirectories
    const subDirs = ["profiles", "hero", "specials", "menu"];
    subDirs.forEach((dir) => {
      const subDir = path.join(uploadsPath, dir);
      if (!fs.existsSync(subDir)) {
        fs.mkdirSync(subDir, { recursive: true });
      }
    });

    // Serve static files from uploads
    this.app.use("/uploads", express.static(uploadsPath));
    logger.info(`📁 Serving static files from: ${uploadsPath}`);

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
        uploads: {
          path: uploadsPath,
          exists: fs.existsSync(uploadsPath),
        },
      });
    });
  }

  setupRoutes() {
    // API routes - WITHOUT /api prefix
    this.app.use("/auth", authRoutes);
    this.app.use("/admin", adminRoutes);
    this.app.use("/staff", staffRoutes);
    this.app.use("/customer", customerRoutes);
    this.app.use("/menu", menuRoutes);
    this.app.use("/hero", heroRoutes);
    this.app.use("/specials", specialRoutes);
    this.app.use("/orders", orderRoutes);

    // Root route
    this.app.get("/", (req, res) => {
      res.json({
        name: "Aroma Restaurant API",
        version: "1.0.0",
        status: "running",
        endpoints: {
          auth: "/auth",
          admin: "/admin",
          staff: "/staff",
          customer: "/customer",
          menu: "/menu",
          hero: "/hero",
          specials: "/specials",
          orders: "/orders",
        },
      });
    });

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
        console.log(`✅ Server running on http://localhost:${port}`);
        console.log(`🌐 Environment: ${config.env}`);
        console.log(`📊 Database: ${Database.getStatus().database}`);
        console.log(`📁 Uploads: ${path.join(__dirname, "../uploads")}`);
        console.log("============================");
        console.log("\n📋 Available Endpoints:");
        console.log(`   GET  /                - API Info`);
        console.log(`   GET  /health          - Health Check`);
        console.log(`   POST /auth/register   - Register`);
        console.log(`   POST /auth/login      - Login`);
        console.log(`   GET  /auth/me         - Get Profile`);
        console.log(`   GET  /menu            - Get Menu`);
        console.log(`   GET  /specials        - Get Specials`);
        console.log(`   GET  /hero/active     - Get Hero Settings`);
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

    setTimeout(() => {
      logger.warn("⚠️ Force shutdown after timeout");
      process.exit(1);
    }, 10000);
  }
}

module.exports = App;
