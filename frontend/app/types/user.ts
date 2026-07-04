export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'staff' | 'admin';
  profileImage: string;
  isVerified: boolean;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer extends User {
  loyaltyPoints: number;
  loyaltyTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  totalOrders: number;
  totalSpent: number;
  addresses: Address[];
  preferences: CustomerPreferences;
  referralCode?: string;
  referredBy?: string;
}

export interface Staff extends User {
  employeeId: string;
  position: 'kitchen' | 'waiter' | 'delivery' | 'manager' | 'cashier';
  department: 'kitchen' | 'front_of_house' | 'delivery' | 'management' | 'admin';
  hireDate: string;
  salary?: number;
  shift: 'morning' | 'evening' | 'night' | 'flexible';
  permissions: StaffPermissions;
  createdBy: string;
}

export interface Admin extends User {
  adminLevel: 'super_admin' | 'admin';
  permissions: AdminPermissions;
  lastActive?: string;
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
  dietaryRestrictions: Array<'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free' | 'halal'>;
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

export interface AdminPermissions {
  manageUsers: boolean;
  manageStaff: boolean;
  manageMenu: boolean;
  manageOrders: boolean;
  manageContent: boolean;
  viewAnalytics: boolean;
  manageSettings: boolean;
}