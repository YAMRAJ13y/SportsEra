export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'user' | 'admin';
  profilePicture?: string;
  bio?: string;
  gender: 'male' | 'female' | 'other';
  contactNumber?: string;
  address?: string;
  dateOfBirth?: string;
  primarySport: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  favoriteSports: string[];
  activeDays: string[];
  achievements?: string;
  isEmailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  sportCategory: string;
  author: {
    id: string;
    fullName: string;
    profilePicture?: string;
  };
  likes: string[];
  likeCount: number;
  commentCount: number;
  comments: Comment[];
  isLikedByUser?: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  author: {
    id: string;
    fullName: string;
    profilePicture?: string;
  };
  content: string;
  replies: Reply[];
  createdAt: string;
  updatedAt: string;
}

export interface Reply {
  id: string;
  author: {
    id: string;
    fullName: string;
    profilePicture?: string;
  };
  content: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  sportCategory: string;
  location: string;
  dateTime: string;
  maxParticipants: number;
  entryFee: number;
  prizeMoney: number;
  eventImage?: string;
  participants: Participant[];
  createdBy: {
    id: string;
    fullName: string;
    profilePicture?: string;
  };
  approvedParticipantsCount: number;
  isFull: boolean;
  isPast: boolean;
  userParticipationStatus?: 'pending' | 'approved' | 'rejected' | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Participant {
  id: string;
  user: {
    id: string;
    fullName: string;
    profilePicture?: string;
    email: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
}

export interface ContactMessage {
  id: string;
  user?: {
    id: string;
    fullName: string;
    profilePicture?: string;
  };
  email: string;
  subject: string;
  message: string;
  adminReply?: string;
  status: 'open' | 'in-progress' | 'closed';
  repliedBy?: {
    id: string;
    fullName: string;
  };
  repliedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalPosts?: number;
  totalEvents?: number;
  totalUsers?: number;
  totalMessages?: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other';
  contactNumber?: string;
  address?: string;
  dateOfBirth?: string;
  primarySport: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  favoriteSports?: string[];
  activeDays?: string[];
  achievements?: string;
  bio?: string;
  profilePicture?: File;
}

export interface CreatePostData {
  title: string;
  content: string;
  sportCategory?: string;
  image?: File;
}

export interface CreateEventData {
  title: string;
  description: string;
  sportCategory: string;
  location: string;
  dateTime: string;
  maxParticipants: number;
  entryFee?: number;
  prizeMoney?: number;
  eventImage?: File;
}

export interface ContactFormData {
  email: string;
  subject: string;
  message: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  totalEvents: number;
  totalMessages: number;
  pendingMessages: number;
}

export interface ChartData {
  monthlyUsers: Array<{
    _id: { year: number; month: number };
    count: number;
  }>;
  monthlyPosts: Array<{
    _id: { year: number; month: number };
    count: number;
  }>;
  sportDistribution: Array<{
    _id: string;
    count: number;
  }>;
}

export const SPORT_CATEGORIES = [
  'Cricket',
  'Hockey', 
  'Kabaddi',
  'Football',
  'Tennis',
  'Badminton',
  'Basketball',
  'Table Tennis'
] as const;

export const SKILL_LEVELS = [
  'Beginner',
  'Intermediate', 
  'Advanced'
] as const;

export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
] as const;