const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const logger = require("../utils/logger");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Test connection
const testConnection = async () => {
  try {
    const result = await cloudinary.api.ping();
    logger.info("✅ Cloudinary connected successfully");
    return result;
  } catch (error) {
    logger.error(`❌ Cloudinary connection failed: ${error.message}`);
    throw error;
  }
};

// Create Cloudinary storage for Multer
const createStorage = (folder = "aroma") => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `aroma/${folder}`,
      allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
      transformation: [
        { width: 800, height: 800, crop: "limit", quality: "auto" },
      ],
      format: "webp", // Convert to webp for better performance
      public_id: (req, file) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const name = file.originalname
          .split(".")[0]
          .replace(/\s+/g, "-")
          .toLowerCase();
        return `${name}-${uniqueSuffix}`;
      },
    },
  });
};

// Upload file directly to Cloudinary
const uploadFile = async (file, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: options.folder || "aroma",
      transformation: options.transformation || [
        { width: 800, height: 800, crop: "limit", quality: "auto" },
      ],
      format: options.format || "webp",
      ...options,
    });

    logger.info(`📤 File uploaded to Cloudinary: ${result.public_id}`);
    return result;
  } catch (error) {
    logger.error(`❌ Cloudinary upload failed: ${error.message}`);
    throw error;
  }
};

// Delete file from Cloudinary
const deleteFile = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    logger.info(`🗑️ File deleted from Cloudinary: ${publicId}`);
    return result;
  } catch (error) {
    logger.error(`❌ Cloudinary delete failed: ${error.message}`);
    throw error;
  }
};

// Get optimized URL
const getOptimizedUrl = (publicId, options = {}) => {
  return cloudinary.url(publicId, {
    fetch_format: "auto",
    quality: "auto",
    ...options,
  });
};

// Upload multiple files
const uploadMultiple = async (files, options = {}) => {
  try {
    const uploadPromises = files.map((file) => uploadFile(file, options));
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    logger.error(`❌ Multiple files upload failed: ${error.message}`);
    throw error;
  }
};

// Create different storage configurations
const storages = {
  profiles: createStorage("profiles"),
  hero: createStorage("hero"),
  specials: createStorage("specials"),
  menu: createStorage("menu"),
  default: createStorage("aroma"),
};

module.exports = {
  cloudinary,
  storages,
  uploadFile,
  uploadMultiple,
  deleteFile,
  getOptimizedUrl,
  testConnection,
};
