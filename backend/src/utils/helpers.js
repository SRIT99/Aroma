/**
 * Helper utilities for common operations
 */

// Generate random string
const generateRandomString = (length = 8) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Generate order number
const generateOrderNumber = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = generateRandomString(6).toUpperCase();
  return `AR${year}${month}${day}-${random}`;
};

// Format currency
const formatCurrency = (amount, currency = "NPR") => {
  return new Intl.NumberFormat("ne-NP", {
    style: "currency",
    currency: "NPR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Calculate discount
const calculateDiscount = (price, discountPercent) => {
  if (!discountPercent || discountPercent <= 0) return price;
  return price - (price * discountPercent) / 100;
};

// Validate phone number (Nepal format)
const validatePhone = (phone) => {
  // Supports: 9841234567, 01-4412345, etc.
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/-/g, ""));
};

// Validate email
const validateEmail = (email) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

// Calculate distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Pagination helper
const paginate = (data, page = 1, limit = 10) => {
  const start = (page - 1) * limit;
  const end = page * limit;
  const paginatedData = data.slice(start, end);

  return {
    data: paginatedData,
    pagination: {
      page,
      limit,
      total: data.length,
      pages: Math.ceil(data.length / limit),
    },
  };
};

// Clean object (remove undefined/null values)
const cleanObject = (obj) => {
  const cleaned = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null && value !== "") {
      if (
        typeof value === "object" &&
        !Array.isArray(value) &&
        value !== null
      ) {
        const nested = cleanObject(value);
        if (Object.keys(nested).length > 0) {
          cleaned[key] = nested;
        }
      } else {
        cleaned[key] = value;
      }
    }
  }
  return cleaned;
};

// Mask sensitive data
const maskSensitive = (data, fields = ["password", "token", "secret"]) => {
  if (typeof data !== "object" || data === null) return data;

  const masked = { ...data };
  fields.forEach((field) => {
    if (masked[field]) {
      masked[field] = "*****";
    }
  });
  return masked;
};

// Get time ago
const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} years ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} months ago`;

  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;

  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hours ago`;

  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutes ago`;

  return "Just now";
};

// Retry function with exponential backoff
const retry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;

    await new Promise((resolve) => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay * 2);
  }
};

// Sleep function
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Get IP address from request
const getClientIP = (req) => {
  return (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket?.remoteAddress
  );
};

module.exports = {
  generateRandomString,
  generateOrderNumber,
  formatCurrency,
  calculateDiscount,
  validatePhone,
  validateEmail,
  calculateDistance,
  paginate,
  cleanObject,
  maskSensitive,
  timeAgo,
  retry,
  sleep,
  getClientIP,
};
