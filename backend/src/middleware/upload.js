const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { AppError } = require("./errorHandler");
const config = require("../config/config");

// Ensure upload directories exist
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = config.upload.path;

    // Determine subfolder based on file type or route
    if (file.fieldname === "profileImage") {
      uploadPath = path.join(uploadPath, "profiles");
    } else if (file.fieldname === "heroImage") {
      uploadPath = path.join(uploadPath, "hero");
    } else if (file.fieldname === "specialImage") {
      uploadPath = path.join(uploadPath, "specials");
    } else if (file.fieldname === "menuImage") {
      uploadPath = path.join(uploadPath, "menu");
    }

    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
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
};

// Create multer instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: config.upload.maxSize,
  },
  fileFilter: fileFilter,
});

// Single file upload middleware
const uploadSingle = (fieldName) => {
  return upload.single(fieldName);
};

// Multiple files upload middleware
const uploadMultiple = (fieldName, maxCount) => {
  return upload.array(fieldName, maxCount || 5);
};

// Handle file upload errors
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "FILE_TOO_LARGE") {
      return res.status(413).json({
        success: false,
        message: `File too large. Max size: ${config.upload.maxSize / (1024 * 1024)}MB`,
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  next(err);
};

module.exports = {
  upload,
  uploadSingle,
  uploadMultiple,
  handleUploadError,
};
