const mongoose = require("mongoose");
const logger = require("../utils/logger");

class Database {
  constructor() {
    this.isConnected = false;
  }

  async connect() {
    if (this.isConnected) {
      logger.info("Database already connected");
      return;
    }

    try {
      const mongoURI = process.env.MONGODB_URI;

      if (!mongoURI) {
        throw new Error("MONGODB_URI is not defined in environment variables");
      }

      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
        maxPoolSize: 10,
        minPoolSize: 2,
        retryWrites: true,
        retryReads: true,
      };

      await mongoose.connect(mongoURI, options);

      this.isConnected = true;

      logger.info(`✅ MongoDB connected successfully`);
      logger.info(`📊 Database: ${mongoose.connection.db.databaseName}`);
      logger.info(`📍 Host: ${mongoose.connection.host}`);

      // Setup event listeners
      this.setupEventListeners();
    } catch (error) {
      logger.error(`❌ MongoDB connection error: ${error.message}`);
      throw error;
    }
  }

  setupEventListeners() {
    mongoose.connection.on("disconnected", () => {
      this.isConnected = false;
      logger.warn("⚠️ MongoDB disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      this.isConnected = true;
      logger.info("✅ MongoDB reconnected");
    });

    mongoose.connection.on("error", (err) => {
      logger.error(`❌ MongoDB error: ${err.message}`);
    });

    process.on("SIGINT", async () => {
      await this.disconnect();
      process.exit(0);
    });
  }

  async disconnect() {
    if (this.isConnected) {
      await mongoose.disconnect();
      this.isConnected = false;
      logger.info("MongoDB disconnected gracefully");
    }
  }

  getConnection() {
    if (!this.isConnected) {
      throw new Error("Database not connected");
    }
    return mongoose.connection;
  }

  getStatus() {
    return {
      isConnected: this.isConnected,
      host: mongoose.connection.host,
      database: mongoose.connection.db?.databaseName,
      readyState: mongoose.connection.readyState,
      connectionState: this.getConnectionState(),
    };
  }

  getConnectionState() {
    const states = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    };
    return states[mongoose.connection.readyState] || "unknown";
  }
}

module.exports = new Database();
