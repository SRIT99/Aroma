const {
  cloudinary,
  uploadFile,
  deleteFile,
  getOptimizedUrl,
} = require("../config/cloudinary");
const logger = require("../utils/logger");

class CloudinaryService {
  // Upload image with custom options
  async uploadImage(file, options = {}) {
    try {
      const result = await uploadFile(file, {
        folder: options.folder || "aroma",
        transformation: options.transformation || [
          { width: 800, height: 800, crop: "limit", quality: "auto" },
        ],
        format: options.format || "webp",
        ...options,
      });

      return {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        size: result.bytes,
      };
    } catch (error) {
      logger.error(`Upload error: ${error.message}`);
      throw error;
    }
  }

  // Upload multiple images
  async uploadMultipleImages(files, options = {}) {
    try {
      const results = await Promise.all(
        files.map((file) => this.uploadImage(file, options)),
      );
      return results;
    } catch (error) {
      logger.error(`Multiple upload error: ${error.message}`);
      throw error;
    }
  }

  // Delete image
  async deleteImage(publicId) {
    try {
      const result = await deleteFile(publicId);
      return result;
    } catch (error) {
      logger.error(`Delete error: ${error.message}`);
      throw error;
    }
  }

  // Get optimized image URL
  getOptimizedUrl(publicId, options = {}) {
    return getOptimizedUrl(publicId, {
      width: options.width || 800,
      height: options.height || 800,
      crop: options.crop || "limit",
      quality: options.quality || "auto",
      ...options,
    });
  }

  // Generate image transformations
  getTransformedUrl(publicId, transformations = {}) {
    return cloudinary.url(publicId, {
      transformation: [
        {
          width: transformations.width || 800,
          height: transformations.height || 800,
          crop: "limit",
        },
        { quality: transformations.quality || "auto" },
        { fetch_format: transformations.format || "auto" },
      ],
    });
  }

  // Create thumbnail
  getThumbnail(publicId, size = 200) {
    return cloudinary.url(publicId, {
      width: size,
      height: size,
      crop: "thumb",
      gravity: "face",
      quality: "auto",
      fetch_format: "auto",
    });
  }

  // Create responsive images
  getResponsiveUrls(publicId) {
    return {
      small: cloudinary.url(publicId, {
        width: 300,
        crop: "limit",
        quality: "auto",
      }),
      medium: cloudinary.url(publicId, {
        width: 600,
        crop: "limit",
        quality: "auto",
      }),
      large: cloudinary.url(publicId, {
        width: 900,
        crop: "limit",
        quality: "auto",
      }),
      original: cloudinary.url(publicId, { quality: "auto" }),
    };
  }
}

module.exports = new CloudinaryService();
