import api, { handleApiResponse, handleApiError } from './api';
import { Post, CreatePostData, ApiResponse, PaginationData } from '../types';

export const postService = {
  // Get all posts
  getPosts: async (params?: {
    page?: number;
    limit?: number;
    sportCategory?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<{ posts: Post[]; pagination: PaginationData }>> => {
    try {
      const response = await api.get('/posts', { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Get single post
  getPost: async (id: string): Promise<ApiResponse<{ post: Post }>> => {
    try {
      const response = await api.get(`/posts/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Create post
  createPost: async (data: CreatePostData): Promise<ApiResponse<{ post: Post }>> => {
    try {
      const formData = new FormData();
      
      formData.append('title', data.title);
      formData.append('content', data.content);
      if (data.sportCategory) {
        formData.append('sportCategory', data.sportCategory);
      }
      if (data.image) {
        formData.append('image', data.image);
      }

      const response = await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Update post
  updatePost: async (id: string, data: CreatePostData): Promise<ApiResponse<{ post: Post }>> => {
    try {
      const formData = new FormData();
      
      formData.append('title', data.title);
      formData.append('content', data.content);
      if (data.sportCategory) {
        formData.append('sportCategory', data.sportCategory);
      }
      if (data.image) {
        formData.append('image', data.image);
      }

      const response = await api.put(`/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Delete post
  deletePost: async (id: string): Promise<ApiResponse<null>> => {
    try {
      const response = await api.delete(`/posts/${id}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Toggle like
  toggleLike: async (id: string): Promise<ApiResponse<{ isLiked: boolean; likeCount: number }>> => {
    try {
      const response = await api.post(`/posts/${id}/like`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Add comment
  addComment: async (id: string, content: string): Promise<ApiResponse<{ comment: any }>> => {
    try {
      const response = await api.post(`/posts/${id}/comments`, { content });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Add reply
  addReply: async (postId: string, commentId: string, content: string): Promise<ApiResponse<{ reply: any }>> => {
    try {
      const response = await api.post(`/posts/${postId}/comments/${commentId}/replies`, { content });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },

  // Delete comment
  deleteComment: async (postId: string, commentId: string): Promise<ApiResponse<null>> => {
    try {
      const response = await api.delete(`/posts/${postId}/comments/${commentId}`);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  },
};