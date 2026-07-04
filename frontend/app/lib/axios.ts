import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';

class ApiClient {
  private client: AxiosInstance;
  private static instance: ApiClient;

  private constructor() {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    
    if (!baseURL) {
      throw new Error('NEXT_PUBLIC_API_URL is not defined in environment variables');
    }

    this.client = axios.create({
      baseURL: baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        const status = error.response?.status;
        const data = error.response?.data as any;

        // Handle authentication errors
        if (status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          toast.error('Session expired. Please login again.');
        }

        // Handle forbidden errors
        if (status === 403) {
          toast.error('You don\'t have permission to perform this action');
        }

        // Handle not found errors
        if (status === 404) {
          toast.error('Resource not found');
        }

        // Handle validation errors
        if (status === 400) {
          const message = data?.message || 'Invalid request';
          toast.error(message);
        }

        // Handle server errors
        if (status && status >= 500) {
          toast.error('Server error. Please try again later.');
        }

        return Promise.reject(error);
      }
    );
  }

  public async get<T = any>(url: string, config?: any): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  public async post<T = any>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  public async put<T = any>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  public async patch<T = any>(url: string, data?: any, config?: any): Promise<T> {
    const response = await this.client.patch<T>(url, data, config);
    return response.data;
  }

  public async delete<T = any>(url: string, config?: any): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = ApiClient.getInstance();
export default apiClient;