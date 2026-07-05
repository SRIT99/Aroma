require("dotenv").config();
const App = require("./src/app");
const logger = require("./src/utils/logger");

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error(`💥 Uncaught Exception: ${error.message}`);
  logger.error(error.stack);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  logger.error(`💥 Unhandled Rejection: ${error.message}`);
  logger.error(error.stack);
  process.exit(1);
});

// Start application
const app = new App();
app.start();

module.exports = app;
