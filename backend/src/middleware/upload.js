const multer = require("multer");
const { AppError } = require("./errorHandler");
const config = require("../config/config");
const { uploadFile } = require("../config/cloudinary");
const logger = require("../utils/logger");

// Memory storage (no disk writing)
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = config.upload.allowedTypes || [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        `File type not allowed. Allowed: ${allowedTypes.join(", ")}`,
        400,
      ),
      false,
    );
  }
};

// Multer instance
const upload = multer({
  storage,
  limits: {
    fileSize: config.upload.maxSize || 5 * 1024 * 1024, // 5MB default
  },
  fileFilter,
});

// Single file upload with Cloudinary - used by routes
const uploadSingle = (fieldName) => {
  return async (req, res, next) => {
    try {
      await upload.single(fieldName)(req, res, async (err) => {
        if (err) {
          if (err instanceof multer.MulterError) {
            return next(new AppError(err.message, 400));
          }
          return next(err);
        }

        if (req.file) {
          const folder = req.body.folder || "aroma";
          const result = await uploadFile(req.file.buffer, { folder });
          req.file.cloudinaryUrl = result.secure_url;
          req.file.publicId = result.public_id;
        }

        next();
      });
    } catch (error) {
      next(error);
    }
  };
};

// Multiple files upload
const uploadMultiple = (fieldName, maxCount = 5) => {
  return async (req, res, next) => {
    try {
      await upload.array(fieldName, maxCount)(req, res, async (err) => {
        if (err) {
          if (err instanceof multer.MulterError) {
            return next(new AppError(err.message, 400));
          }
          return next(err);
        }

        if (req.files && req.files.length > 0) {
          const folder = req.body.folder || "aroma";
          const uploadPromises = req.files.map((file) =>
            uploadFile(file.buffer, { folder }),
          );
          const results = await Promise.all(uploadPromises);
          req.files = req.files.map((file, index) => ({
            ...file,
            cloudinaryUrl: results[index].secure_url,
            publicId: results[index].public_id,
          }));
        }

        next();
      });
    } catch (error) {
      next(error);
    }
  };
};

// Error handler for Multer
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
  uploadSingle, // ✅ exported as uploadSingle
  uploadMultiple, // ✅ exported as uploadMultiple
  handleUploadError,
};
