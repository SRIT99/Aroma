import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ne-NP', {
    style: 'currency',
    currency: 'NPR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export const formatTimeAgo = (date: string | Date): string => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  
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
  
  return 'Just now';
};

export const truncateText = (text: string, length: number): string => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

export const calculateDiscount = (price: number, discountPercent: number): number => {
  if (!discountPercent || discountPercent <= 0) return price;
  return price - (price * discountPercent / 100);
};

export const generateOrderNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `AR${year}${month}${day}${random}`;
};

export const getInitials = (name: string): string => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// FIXED: Added fallback to ensure string is always returned
export const getRandomColor = (): string => {
  const colors: string[] = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-amber-500',
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  // Fallback to a default color if randomIndex is out of bounds
  return colors[randomIndex] || 'bg-gray-500';
};

export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1,4})(\d{3})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return phone;
};

export const validateEmail = (email: string): boolean => {
  if (!email) return false;
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  if (!phone) return false;
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/-/g, ''));
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const getImageUrl = (path: string): string => {
  if (!path) return '/images/placeholder.jpg';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/uploads')) {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!baseUrl) return path;
    return `${baseUrl}${path}`;
  }
  return path;
};

// Utility to safely parse JSON
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};

// Utility to generate slug from string
export const generateSlug = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
};

// Utility to check if string is empty or whitespace
export const isEmptyString = (str: string | null | undefined): boolean => {
  return !str || str.trim().length === 0;
};

// Utility to format number with commas
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

// Utility to get file extension
export const getFileExtension = (filename: string): string => {
  if (!filename) return '';
  return filename.split('.').pop()?.toLowerCase() || '';
};

// Utility to check if file is image
export const isImageFile = (filename: string): boolean => {
  const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif'];
  return extensions.includes(getFileExtension(filename));
};

// Utility to format bytes to readable size
export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Utility to get random ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Utility to get current year
export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

// Utility to check if running on server
export const isServer = (): boolean => {
  return typeof window === 'undefined';
};

// Utility to check if running on client
export const isClient = (): boolean => {
  return typeof window !== 'undefined';
};

// Utility to copy text to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (isClient() && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

// Utility to get query params from URL
export const getQueryParams = (url: string): Record<string, string> => {
  if (!url) return {};
  const params = new URLSearchParams(url);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
};

// Utility to build query string
export const buildQueryString = (params: Record<string, any>): string => {
  const filtered = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  
  const searchParams = new URLSearchParams();
  Object.entries(filtered).forEach(([key, value]) => {
    searchParams.append(key, String(value));
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};