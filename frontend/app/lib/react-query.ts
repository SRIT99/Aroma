import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchInterval: false,
      refetchIntervalInBackground: false,
      enabled: true,
      networkMode: 'online',
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
      networkMode: 'online',
    },
  },
});

export const QUERY_KEYS = {
  // Auth
  auth: 'auth',
  user: 'user',
  
  // Menu
  menu: 'menu',
  menuCategories: 'menuCategories',
  menuItem: (id: string) => ['menu', id] as const,
  
  // Specials
  specials: 'specials',
  todaySpecials: 'todaySpecials',
  
  // Hero
  hero: 'hero',
  
  // Orders
  orders: 'orders',
  order: (id: string) => ['orders', id] as const,
  
  // Customers
  customers: 'customers',
  customer: (id: string) => ['customers', id] as const,
  
  // Staff
  staff: 'staff',
  staffMember: (id: string) => ['staff', id] as const,
  
  // Testimonials
  testimonials: 'testimonials',
  featuredTestimonials: 'featuredTestimonials',
  
  // Leaderboard
  leaderboard: 'leaderboard',
  
  // Dashboard
  dashboard: 'dashboard',
  
  // Loyalty
  loyalty: 'loyalty',
  
  // Cart
  cart: 'cart',
  
  // Addresses
  addresses: 'addresses',
  
  // Favorites
  favorites: 'favorites',
} as const;

// Type for query keys
export type QueryKeys = typeof QUERY_KEYS;