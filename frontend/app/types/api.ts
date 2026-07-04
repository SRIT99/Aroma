import { Customer, User } from ".";

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  error?: string;
  statusCode?: number;
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

export interface ApiError {
  success: false;
  message: string;
  errorCode?: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User | Customer;
    token: string;
    role: string;
  };
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateProfileData {
  name?: string;
  phone?: string;
  profileImage?: File;
}