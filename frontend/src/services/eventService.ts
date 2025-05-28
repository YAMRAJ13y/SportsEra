import api, { handleApiResponse, handleApiError } from './api';
import { Event, CreateEventData, ApiResponse, PaginationData } from '../types';

export const eventService = {
  // Get all events
  getEvents: async (params?: {
    page?: number;
    limit?: number;
    sportCategory?: string;
    location?: string;
    upcoming?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<{ events: Event[]; pagination: PaginationData }>> => {
    try {
      const response = await api.get('/events', { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get single event
  getEvent: async (id: string): Promise<ApiResponse<{ event: Event }>> => {
    try {
      const response = await api.get(`/events/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Create event (Admin only)
  createEvent: async (data: CreateEventData): Promise<ApiResponse<{ event: Event }>> => {
    try {
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'eventImage' && value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      const response = await api.post('/events', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Update event (Admin only)
  updateEvent: async (id: string, data: CreateEventData): Promise<ApiResponse<{ event: Event }>> => {
    try {
      const formData = new FormData();
      
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'eventImage' && value instanceof File) {
            formData.append(key, value);
          } else {
            formData.append(key, value.toString());
          }
        }
      });

      const response = await api.put(`/events/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Delete event (Admin only)
  deleteEvent: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const response = await api.delete(`/events/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Apply for event
  applyForEvent: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const response = await api.post(`/events/${id}/apply`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Withdraw from event
  withdrawFromEvent: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const response = await api.delete(`/events/${id}/withdraw`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Manage participant (Admin only)
  manageParticipant: async (
    eventId: string, 
    participantId: string, 
    status: 'approved' | 'rejected'
  ): Promise<ApiResponse<null>> => {
    try {
      const response = await api.put(`/events/${eventId}/participants/${participantId}`, { status });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get user's events
  getUserEvents: async (status?: 'pending' | 'approved' | 'rejected' | 'all'): Promise<ApiResponse<{ events: Event[] }>> => {
    try {
      const response = await api.get('/events/user/my-events', { 
        params: status ? { status } : undefined 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};