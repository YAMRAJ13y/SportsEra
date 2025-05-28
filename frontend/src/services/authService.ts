import api, { handleApiResponse, handleApiError } from './api';
import { User, LoginData, RegisterData, ApiResponse } from '../types';

export const authService = {
  // Register user
  register: async (data: RegisterData): Promise<ApiResponse<{ user: User; token: string; refreshToken: string }>> => {
    try {
      const formData = new FormData();
      
      // Append all fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'favoriteSports' || key === 'activeDays') {
            formData.append(key, Array.isArray(value) ? value.join(',') : value);
          } else if (key === 'profilePicture' && value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      const response = await api.post('/auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Login user
  login: async (data: LoginData): Promise<ApiResponse<{ user: User; token: string; refreshToken: string }>> => {
    try {
      const response = await api.post('/auth/login', data);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get current user
  getMe: async (): Promise<ApiResponse<{ user: User }>> => {
    try {
      const response = await api.get('/auth/me');
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Update profile
  updateProfile: async (data: Partial<RegisterData>): Promise<ApiResponse<{ user: User }>> => {
    try {
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'favoriteSports' || key === 'activeDays') {
            formData.append(key, Array.isArray(value) ? value.join(',') : value);
          } else if (key === 'profilePicture' && value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      const response = await api.put('/auth/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Verify email
  verifyEmail: async (token: string): Promise<ApiResponse<null>> => {
    try {
      const response = await api.get(`/auth/verify-email/${token}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<ApiResponse<null>> => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Reset password
  resetPassword: async (token: string, password: string): Promise<ApiResponse<{ token: string }>> => {
    try {
      const response = await api.put(`/auth/reset-password/${token}`, { password });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};