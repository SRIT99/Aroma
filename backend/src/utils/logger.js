const winston = require("winston");
const path = require("path");
const fs = require("fs");

// Create logs directory if it doesn't exist
const logDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    if (stack) {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}\n${stack}`;
    }
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  }),
);

// Define color format for console
const colorFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level}: ${message}`;
  }),
);

// Create logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: logFormat,
  transports: [
    // Console transport with colors
    new winston.transports.Console({
      format: colorFormat,
      handleExceptions: true,
    }),
    // File transport for all logs
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      handleExceptions: true,
    }),
    // File transport for error logs
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});

// Create a stream object for Morgan integration
logger.stream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

// Add method to log HTTP requests
logger.logRequest = (req, res, next) => {
  const start = Date.now();
  const { method, url, ip } = req;

  // Log after response is sent
  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const statusColor = status >= 500 ? "❌" : status >= 400 ? "⚠️" : "✅";

    logger.info(
      `${statusColor} ${method} ${url} ${status} - ${duration}ms - ${ip}`,
    );
  });

  next();
};

// Add method to log database queries
logger.logDatabase = (operation, collection, filter = {}, duration) => {
  logger.debug(`📊 Database ${operation} on ${collection} - ${duration}ms`);
  if (process.env.NODE_ENV === "development") {
    logger.debug(`   Filter: ${JSON.stringify(filter)}`);
  }
};

// Add method to log API responses
logger.logAPI = (req, res, data = null) => {
  const { method, url, ip } = req;
  const status = res.statusCode;

  if (status >= 400) {
    logger.error(`❌ API Error: ${method} ${url} - ${status} - ${ip}`);
    if (data && process.env.NODE_ENV === "development") {
      logger.error(`   Response: ${JSON.stringify(data)}`);
    }
  } else {
    logger.info(`✅ API Success: ${method} ${url} - ${status} - ${ip}`);
  }
};

// Add method to log authentication events
logger.logAuth = (action, user, success = true) => {
  const emoji = success ? "🔓" : "🔒";
  const status = success ? "successful" : "failed";
  const userInfo = user ? ` (${user.email || user})` : "";

  logger.info(`${emoji} Authentication ${action} ${status}${userInfo}`);
};

// Add method to log order events
logger.logOrder = (orderId, action, data = {}) => {
  logger.info(`📦 Order ${orderId}: ${action}`);
  if (Object.keys(data).length > 0 && process.env.NODE_ENV === "development") {
    logger.debug(`   Order Data: ${JSON.stringify(data)}`);
  }
};

// Handle uncaught exceptions
logger.handleExceptions = () => {
  process.on("uncaughtException", (error) => {
    logger.error(`💥 Uncaught Exception: ${error.message}`);
    logger.error(error.stack);
    // Graceful shutdown
    process.exit(1);
  });

  process.on("unhandledRejection", (reason, promise) => {
    logger.error(`💥 Unhandled Rejection: ${reason}`);
    if (reason instanceof Error) {
      logger.error(reason.stack);
    }
  });
};

module.exports = logger;
