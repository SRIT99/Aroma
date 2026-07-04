export const APP_CONFIG = {
  name: 'Aroma Restaurant',
  shortName: 'Aroma',
  description: 'Best restaurant in Gauradaha, Jhapa, Nepal',
  url: 'https://aromarestaurant.com',
  email: 'info@aromarestaurant.com',
  phone: '+977-9841234567',
  address: 'Gauradaha Main Road, Gauradaha, Jhapa, Nepal',
  coordinates: {
    lat: 26.6312,
    lng: 87.4321,
  },
  socialMedia: {
    facebook: 'https://facebook.com/aromarestaurant',
    instagram: 'https://instagram.com/aromarestaurant',
    twitter: 'https://twitter.com/aromarestaurant',
    youtube: 'https://youtube.com/aromarestaurant',
  },
  openingHours: {
    monday: '10:00 AM - 10:00 PM',
    tuesday: '10:00 AM - 10:00 PM',
    wednesday: '10:00 AM - 10:00 PM',
    thursday: '10:00 AM - 10:00 PM',
    friday: '10:00 AM - 10:00 PM',
    saturday: '10:00 AM - 10:00 PM',
    sunday: '10:00 AM - 10:00 PM',
  },
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const ORDER_STATUS_LABELS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  ready: 'Ready',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
} as const;

export const ORDER_STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  preparing: 'bg-purple-100 text-purple-800',
  ready: 'bg-green-100 text-green-800',
  out_for_delivery: 'bg-orange-100 text-orange-800',
  delivered: 'bg-emerald-100 text-emerald-800',
  cancelled: 'bg-red-100 text-red-800',
} as const;

export const PAYMENT_METHODS = {
  CASH: 'cash',
  CARD: 'card',
  KHALTI: 'khalti',
  ESEWA: 'esewa',
  ONLINE: 'online',
} as const;

export const PAYMENT_METHOD_LABELS = {
  cash: 'Cash on Delivery',
  card: 'Card Payment',
  khalti: 'Khalti',
  esewa: 'eSewa',
  online: 'Online Payment',
} as const;

export const LOYALTY_TIERS = {
  BRONZE: 'Bronze',
  SILVER: 'Silver',
  GOLD: 'Gold',
  PLATINUM: 'Platinum',
} as const;

export const LOYALTY_TIER_REQUIREMENTS = {
  Bronze: 0,
  Silver: 200,
  Gold: 500,
  Platinum: 1000,
} as const;

export const LOYALTY_TIER_COLORS = {
  Bronze: 'bg-amber-600 text-white',
  Silver: 'bg-gray-400 text-white',
  Gold: 'bg-yellow-500 text-white',
  Platinum: 'bg-gray-700 text-white',
} as const;

export const MENU_CATEGORIES = {
  MEAL_ITEMS: 'meal_items',
  CHICKEN_PLATTER: 'chicken_platter',
  BURGER_VALUE_MEAL: 'burger_value_meal',
  SIZZLER: 'sizzler',
  POPULAR_FAST_FOODS: 'popular_fast_foods',
  MOMO: 'momo',
} as const;

export const MENU_CATEGORY_LABELS = {
  meal_items: 'Meal Items',
  chicken_platter: 'Chicken Platter',
  burger_value_meal: 'Burger Value Meal',
  sizzler: 'Sizzler',
  popular_fast_foods: 'Popular Fast Foods',
  momo: 'Mo:Mo',
} as const;

export const ROUTES = {
  HOME: '/',
  MENU: '/menu',
  SPECIALS: '/specials',
  LEADERBOARD: '/leaderboard',
  CONTACT: '/contact',
  ABOUT: '/about',
  CART: '/cart',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  ORDERS: '/orders',
  REWARDS: '/rewards',
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    STAFF: '/admin/staff',
    MENU: '/admin/menu',
    ORDERS: '/admin/orders',
    SETTINGS: '/admin/settings',
  },
  STAFF: {
    DASHBOARD: '/staff/dashboard',
    ORDERS: '/staff/orders',
  },
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
    CHANGE_PASSWORD: '/auth/change-password',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard/stats',
    USERS: '/admin/users',
    STAFF: '/admin/staff',
    SETTINGS: '/admin/settings',
  },
  STAFF: {
    PROFILE: '/staff/profile',
    ORDERS: '/staff/orders',
    AVAILABILITY: '/staff/availability',
  },
  CUSTOMER: {
    PROFILE: '/customer/profile',
    ORDERS: '/customer/orders',
    LOYALTY: '/customer/loyalty',
    ADDRESSES: '/customer/addresses',
    FAVORITES: '/customer/favorites',
  },
  MENU: {
    BASE: '/menu',
    CATEGORY: '/menu/category',
    SPECIAL: '/menu/special',
    SEARCH: '/menu/search',
  },
  SPECIALS: {
    BASE: '/specials',
    TODAY: '/specials/today',
  },
  HERO: {
    ACTIVE: '/hero/active',
    UPDATE: '/hero',
  },
  ORDERS: {
    BASE: '/orders',
    STATUS: '/orders/:id/status',
  },
} as const;