export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'staff' | 'admin';
  profileImage: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Customer extends User {
  loyaltyPoints: number;
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  totalOrders: number;
  totalSpent: number;
  addresses: Address[];
  preferences: CustomerPreferences;
}

export interface Staff extends User {
  employeeId: string;
  position: 'kitchen' | 'waiter' | 'delivery' | 'manager' | 'cashier';
  department: 'kitchen' | 'front_of_house' | 'delivery' | 'management' | 'admin';
  permissions: StaffPermissions;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  area: string;
  landmark?: string;
  isDefault: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface CustomerPreferences {
  dietaryRestrictions: string[];
  favoriteItems: string[];
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export interface StaffPermissions {
  canProcessOrders: boolean;
  canViewOrders: boolean;
  canUpdateOrderStatus: boolean;
  canAccessReports: boolean;
}

export interface MenuItem {
  _id: string;
  category: string;
  subCategory?: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  discount: number;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  isPopular: boolean;
  isActive: boolean;
  preparationTime: number;
  image: string;
  images: string[];
  tags: string[];
  options: MenuOption[];
  ratings: {
    average: number;
    count: number;
  };
  discountedPrice?: number;
}

export interface MenuOption {
  name: string;
  price: number;
  isDefault: boolean;
}

export interface SpecialDish {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount: number;
  isActive: boolean;
  isTodaySpecial: boolean;
  category: string;
  cuisine: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  rating: number;
  reviewsCount: number;
  preparationTime: number;
  tags: string[];
  featured: boolean;
}

export interface HeroSettings {
  _id: string;
  isActive: boolean;
  title: string;
  subtitle: string;
  description?: string;
  backgroundImage: string;
  discount: number;
  discountLabel: string;
  discountDescription: string;
  discountExpiry?: string;
  specialToday?: {
    name: string;
    description: string;
    image: string;
    price: number;
    link: string;
  };
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  stats: HeroStat[];
}

export interface HeroStat {
  label: string;
  value: string;
  icon?: string;
}

export interface Testimonial {
  _id: string;
  user: User;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  isVerified: boolean;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customer: string | User;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  serviceCharge: number;
  tax: number;
  totalAmount: number;
  orderType: 'dine_in' | 'takeaway' | 'delivery';
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';
  statusHistory: OrderStatusHistory[];
  paymentMethod: 'cash' | 'card' | 'khalti' | 'esewa' | 'online';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  deliveryAddress?: Address;
  assignedTo?: string;
  estimatedTime?: string;
  notes?: string;
  createdAt: string;
}

export interface OrderItem {
  menuItem: string | MenuItem;
  name: string;
  quantity: number;
  price: number;
  totalPrice: number;
  specialInstructions?: string;
  options: MenuOption[];
}

export interface OrderStatusHistory {
  status: string;
  updatedBy: string;
  timestamp: string;
  note?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  options?: MenuOption[];
  specialInstructions?: string;
  totalPrice: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
// types/index.ts - Main exports
export * from './user';
export * from './menu';
export * from './order';
export * from './api';
export * from './common';
export * from './cart';