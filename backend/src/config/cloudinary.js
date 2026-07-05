const cloudinary = require("cloudinary").v2;
const logger = require("../utils/logger");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const testConnection = async () => {
  try {
    await cloudinary.api.ping();
    logger.info("✅ Cloudinary connected successfully");
  } catch (error) {
    logger.error(`❌ Cloudinary connection failed: ${error.message}`);
    throw error;
  }
};

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
    logger.info(`📤 File uploaded: ${result.public_id}`);
    return result;
  } catch (error) {
    logger.error(`❌ Upload failed: ${error.message}`);
    throw error;
  }
};

const deleteFile = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    logger.info(`🗑️ Deleted: ${publicId}`);
    return result;
  } catch (error) {
    logger.error(`❌ Delete failed: ${error.message}`);
    throw error;
  }
};

const getOptimizedUrl = (publicId, options = {}) => {
  return cloudinary.url(publicId, {
    fetch_format: "auto",
    quality: "auto",
    ...options,
  });
};

const uploadMultiple = async (files, options = {}) => {
  try {
    const results = await Promise.all(files.map((f) => uploadFile(f, options)));
    return results;
  } catch (error) {
    logger.error(`❌ Multiple upload failed: ${error.message}`);
    throw error;
  }
};

module.exports = {
  cloudinary,
  uploadFile,
  uploadMultiple,
  deleteFile,
  getOptimizedUrl,
  testConnection,
};
