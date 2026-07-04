export interface Location {
  lat: number;
  lng: number;
  address: string;
  city: string;
  district: string;
  province: string;
  country: string;
  postalCode: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  website: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  openingHours: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
}

export interface Stats {
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
  averageRating: number;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface MetaData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

export interface FilterOptions {
  category?: string;
  subCategory?: string;
  minPrice?: number;
  maxPrice?: number;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'popularity' | 'newest';
  search?: string;
}

export interface Notification {
  id: string;
  type: 'order' | 'promotion' | 'system' | 'loyalty';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}