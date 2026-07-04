const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const {
  cloudinary,
  storages,
  testConnection,
} = require("../config/cloudinary");
const { AppError } = require("./errorHandler");
const config = require("../config/config");
const logger = require("../utils/logger");

// Test Cloudinary connection on startup
testConnection().catch((err) => {
  logger.warn("⚠️ Cloudinary connection failed. Check your credentials.");
});

// Configure multer with Cloudinary storage
const createMulter = (storage) => {
  return multer({
    storage: storage,
    limits: {
      fileSize: config.upload.maxSize,
    },
    fileFilter: (req, file, cb) => {
      const allowedTypes = config.upload.allowedTypes;
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(
          new AppError(
            `File type not allowed. Allowed types: ${allowedTypes.join(", ")}`,
            400,
          ),
          false,
        );
      }
    },
  });
};

// Different upload instances for different purposes
const upload = {
  // Profile images
  profile: createMulter(storages.profiles),

  // Hero images
  hero: createMulter(storages.hero),

  // Special dish images
  special: createMulter(storages.specials),

  // Menu images
  menu: createMulter(storages.menu),

  // Generic upload
  default: createMulter(storages.default),
};

// Helper functions
const uploadSingle = (type, fieldName) => {
  return upload[type]
    ? upload[type].single(fieldName)
    : upload.default.single(fieldName);
};

const uploadMultiple = (type, fieldName, maxCount = 5) => {
  return upload[type]
    ? upload[type].array(fieldName, maxCount)
    : upload.default.array(fieldName, maxCount);
};

// Handle upload errors
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "FILE_TOO_LARGE") {
      return res.status(413).json({
        success: false,
        message: `File too large. Max size: ${config.upload.maxSize / (1024 * 1024)}MB`,
      });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        success: false,
        message: "Too many files uploaded",
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  next(err);
};

// Get Cloudinary URL from file
const getFileUrl = (file) => {
  if (file && file.path) {
    return file.path; // Cloudinary URL
  }
  return null;
};

// Get Cloudinary public ID from file
const getPublicId = (file) => {
  if (file && file.filename) {
    return file.filename; // Cloudinary public ID
  }
  return null;
};

module.exports = {
  upload,
  uploadSingle,
  uploadMultiple,
  handleUploadError,
  getFileUrl,
  getPublicId,
  cloudinary,
};
