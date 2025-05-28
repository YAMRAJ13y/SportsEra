import api, { handleApiResponse, handleApiError } from './api';
import { ContactMessage, ContactFormData, ApiResponse, PaginationData } from '../types';

export const contactService = {
  // Create contact message
  createMessage: async (data: ContactFormData): Promise<ApiResponse<{ contactMessage: ContactMessage }>> => {
    try {
      const response = await api.post('/contact', data);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get user's messages
  getUserMessages: async (): Promise<ApiResponse<{ messages: ContactMessage[] }>> => {
    try {
      const response = await api.get('/contact/my-messages');
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Admin: Get all contact messages
  getMessages: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<{ messages: ContactMessage[]; pagination: PaginationData }>> => {
    try {
      const response = await api.get('/contact', { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Admin: Get single message
  getMessage: async (id: string): Promise<ApiResponse<{ message: ContactMessage }>> => {
    try {
      const response = await api.get(`/contact/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Admin: Reply to message
  replyToMessage: async (id: string, reply: string): Promise<ApiResponse<{ message: ContactMessage }>> => {
    try {
      const response = await api.post(`/contact/${id}/reply`, { reply });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Admin: Update message status
  updateMessageStatus: async (id: string, status: 'open' | 'in-progress' | 'closed'): Promise<ApiResponse<{ message: ContactMessage }>> => {
    try {
      const response = await api.put(`/contact/${id}/status`, { status });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Admin: Delete message
  deleteMessage: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const response = await api.delete(`/contact/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};