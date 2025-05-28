import api, { handleApiResponse, handleApiError } from './api';
import { User, Post, Event, DashboardStats, ChartData, ApiResponse, PaginationData } from '../types';

export const adminService = {
  // Get dashboard statistics
  getDashboardStats: async (): Promise<ApiResponse<{
    stats: DashboardStats;
    recentActivity: {
      users: User[];
      posts: Post[];
      events: Event[];
    };
    charts: ChartData;
  }>> => {
    try {
      const response = await api.get('/admin/dashboard/stats');
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // User management
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    isActive?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<{ users: User[]; pagination: PaginationData }>> => {
    try {
      const response = await api.get('/admin/users', { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  getUser: async (id: string): Promise<ApiResponse<{
    user: User;
    userPosts: Post[];
    userEvents: Event[];
  }>> => {
    try {
      const response = await api.get(`/admin/users/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  updateUser: async (id: string, data: { role?: string; isActive?: boolean }): Promise<ApiResponse<{ user: User }>> => {
    try {
      const response = await api.put(`/admin/users/${id}`, data);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  deleteUser: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const response = await api.delete(`/admin/users/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Content moderation
  getPostsForModeration: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    sportCategory?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<{ posts: Post[]; pagination: PaginationData }>> => {
    try {
      const response = await api.get('/admin/posts', { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  getEventsForManagement: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    sportCategory?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<{ events: Event[]; pagination: PaginationData }>> => {
    try {
      const response = await api.get('/admin/events', { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};