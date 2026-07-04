/**
 * Application constants
 */

// User roles
const USER_ROLES = {
  CUSTOMER: "customer",
  STAFF: "staff",
  ADMIN: "admin",
};

// Staff positions
const STAFF_POSITIONS = {
  KITCHEN: "kitchen",
  WAITER: "waiter",
  DELIVERY: "delivery",
  MANAGER: "manager",
  CASHIER: "cashier",
};

// Staff departments
const STAFF_DEPARTMENTS = {
  KITCHEN: "kitchen",
  FRONT_OF_HOUSE: "front_of_house",
  DELIVERY: "delivery",
  MANAGEMENT: "management",
  ADMIN: "admin",
};

// Order statuses
const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PREPARING: "preparing",
  READY: "ready",
  OUT_FOR_DELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

// Payment methods
const PAYMENT_METHODS = {
  CASH: "cash",
  CARD: "card",
  KHALTI: "khalti",
  ESEWA: "esewa",
  ONLINE: "online",
};

// Loyalty tiers
const LOYALTY_TIERS = {
  BRONZE: "Bronze",
  SILVER: "Silver",
  GOLD: "Gold",
  PLATINUM: "Platinum",
};

// Loyalty tier requirements (points needed)
const LOYALTY_REQUIREMENTS = {
  [LOYALTY_TIERS.BRONZE]: 0,
  [LOYALTY_TIERS.SILVER]: 200,
  [LOYALTY_TIERS.GOLD]: 500,
  [LOYALTY_TIERS.PLATINUM]: 1000,
};

// Order types
const ORDER_TYPES = {
  DINE_IN: "dine_in",
  TAKEAWAY: "takeaway",
  DELIVERY: "delivery",
};

// Menu categories
const MENU_CATEGORIES = {
  MEAL_ITEMS: "meal_items",
  CHICKEN_PLATTER: "chicken_platter",
  BURGER_VALUE_MEAL: "burger_value_meal",
  SIZZLER: "sizzler",
  POPULAR_FAST_FOODS: "popular_fast_foods",
  MOMO: "momo",
};

// Special dish categories
const SPECIAL_CATEGORIES = {
  STARTER: "starter",
  MAIN: "main",
  DESSERT: "dessert",
  BEVERAGE: "beverage",
};

// Cuisine types
const CUISINE_TYPES = {
  NEPALI: "nepali",
  INDIAN: "indian",
  CHINESE: "chinese",
  CONTINENTAL: "continental",
  FUSION: "fusion",
};

// Allergens
const ALLERGENS = {
  DAIRY: "dairy",
  EGGS: "eggs",
  FISH: "fish",
  SHELLFISH: "shellfish",
  TREE_NUTS: "tree_nuts",
  PEANUTS: "peanuts",
  WHEAT: "wheat",
  SOY: "soy",
};

// HTTP status codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

// Error codes
const ERROR_CODES = {
  DUPLICATE_KEY: "DUPLICATE_KEY",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_TOKEN: "INVALID_TOKEN",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  PERMISSION_DENIED: "PERMISSION_DENIED",
  RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",
  DATABASE_ERROR: "DATABASE_ERROR",
  INSUFFICIENT_STOCK: "INSUFFICIENT_STOCK",
  PAYMENT_FAILED: "PAYMENT_FAILED",
};

// File upload limits
const UPLOAD_LIMITS = {
  PROFILE_IMAGE: 5 * 1024 * 1024, // 5MB
  MENU_IMAGE: 10 * 1024 * 1024, // 10MB
  HERO_IMAGE: 20 * 1024 * 1024, // 20MB
};

// Time constants
const TIME = {
  ONE_MINUTE: 60 * 1000,
  FIVE_MINUTES: 5 * 60 * 1000,
  FIFTEEN_MINUTES: 15 * 60 * 1000,
  ONE_HOUR: 60 * 60 * 1000,
  ONE_DAY: 24 * 60 * 60 * 1000,
  ONE_WEEK: 7 * 24 * 60 * 60 * 1000,
};

// Admin levels
const ADMIN_LEVELS = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
};

// Export all constants
module.exports = {
  USER_ROLES,
  STAFF_POSITIONS,
  STAFF_DEPARTMENTS,
  ORDER_STATUS,
  PAYMENT_METHODS,
  LOYALTY_TIERS,
  LOYALTY_REQUIREMENTS,
  ORDER_TYPES,
  MENU_CATEGORIES,
  SPECIAL_CATEGORIES,
  CUISINE_TYPES,
  ALLERGENS,
  HTTP_STATUS,
  ERROR_CODES,
  UPLOAD_LIMITS,
  TIME,
  ADMIN_LEVELS,
};
