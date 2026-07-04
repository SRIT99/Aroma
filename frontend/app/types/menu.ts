export interface MenuItem {
  _id: string;
  category: 'meal_items' | 'chicken_platter' | 'burger_value_meal' | 'sizzler' | 'popular_fast_foods' | 'momo';
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
  createdAt: string;
  updatedAt: string;
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
  category: 'starter' | 'main' | 'dessert' | 'beverage';
  cuisine: 'nepali' | 'indian' | 'chinese' | 'continental' | 'fusion';
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  rating: number;
  reviewsCount: number;
  preparationTime: number;
  tags: string[];
  featured: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface HeroSettings {
  _id: string;
  isActive: boolean;
  title: string;
  subtitle: string;
  description?: string;
  backgroundImage: string;
  backgroundVideo?: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface HeroStat {
  label: string;
  value: string;
  icon?: string;
}

export interface Testimonial {
  _id: string;
  user: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  isVerified: boolean;
  isActive: boolean;
  isFeatured: boolean;
  displayOrder: number;
  response?: {
    text: string;
    respondedBy: string;
    respondedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}