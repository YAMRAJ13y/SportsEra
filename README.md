# SportsEra - Modern Sports Community Platform

A full-stack web application built with React, Node.js, and MongoDB that connects sports enthusiasts, athletes, and event organizers in one unified platform.

## 🚀 Features

### User Features
- **User Authentication**: Registration, login, email verification, password reset
- **User Profiles**: Customizable profiles with sports interests, skill levels, and achievements
- **Posts System**: Create, view, like, and comment on sports-related posts
- **Events System**: Browse and participate in sports events and tournaments
- **Contact System**: Send messages to administrators
- **Responsive Design**: Mobile-first design that works on all devices

### Admin Features
- **Admin Dashboard**: Comprehensive overview with analytics and statistics
- **User Management**: View, manage, and moderate user accounts
- **Post Moderation**: Review and moderate user-generated content
- **Event Management**: Create, update, and manage sports events
- **Message Management**: Handle user inquiries and support requests

### Technical Features
- **Modern Tech Stack**: React 18, Node.js, Express, MongoDB
- **TypeScript**: Full type safety on the frontend
- **Authentication**: JWT-based authentication with refresh tokens
- **File Upload**: Image upload with Cloudinary integration
- **Email System**: Automated emails for verification and notifications
- **Security**: Rate limiting, input validation, and security headers
- **API Documentation**: RESTful API with comprehensive error handling

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Material-UI (MUI)** for UI components
- **React Router** for navigation
- **React Query** for data fetching and caching
- **React Hook Form** with Yup validation
- **Axios** for HTTP requests
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Cloudinary** for image storage
- **NodeMailer** for email sending
- **Express Validator** for input validation
- **Helmet** for security headers
- **Morgan** for logging

## 📁 Project Structure

```
SportsEra-Modern/
├── backend/
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Custom middleware
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── config/              # Configuration files
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── server.js            # Entry point
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React contexts
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   ├── hooks/           # Custom hooks
│   │   └── App.tsx          # Main app component
│   ├── .env                 # Environment variables
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SportsEra-Modern
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Copy environment file and configure
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   
   # Copy environment file and configure
   cp .env.example .env
   # Edit .env with your configuration
   ```

### Configuration

#### Backend Environment Variables (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/sportsera

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# Email (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@sportsera.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

#### Frontend Environment Variables (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=SportsEra
```

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start the Backend**
   ```bash
   cd backend
   npm run dev
   ```

3. **Start the Frontend**
   ```bash
   cd frontend
   npm start
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify-email/:token` - Email verification
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password
- `POST /api/auth/refresh-token` - Refresh JWT token

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/profile` - Delete user account

### Posts Endpoints
- `GET /api/posts` - Get all posts (with pagination and filters)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Toggle like on post
- `POST /api/posts/:id/comments` - Add comment to post

### Events Endpoints
- `GET /api/events` - Get all events (with pagination and filters)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create new event (admin only)
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)
- `POST /api/events/:id/apply` - Apply for event participation
- `DELETE /api/events/:id/withdraw` - Withdraw from event

### Contact Endpoints
- `POST /api/contact` - Send contact message
- `GET /api/contact` - Get all messages (admin only)
- `PUT /api/contact/:id` - Update message status (admin only)

### Admin Endpoints
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/posts` - Get all posts for moderation
- `DELETE /api/admin/posts/:id` - Delete post

## 🔒 Security Features

- **JWT Authentication** with refresh tokens
- **Password Hashing** using bcrypt
- **Input Validation** and sanitization
- **Rate Limiting** to prevent abuse
- **CORS** configuration
- **Security Headers** with Helmet
- **File Upload** restrictions and validation
- **Environment Variables** for sensitive data

## 🎨 UI/UX Features

- **Material Design** components
- **Responsive Layout** for all screen sizes
- **Dark/Light Theme** support
- **Loading States** and error handling
- **Form Validation** with user-friendly messages
- **Image Upload** with preview
- **Infinite Scroll** for posts and events
- **Search and Filter** functionality

## 🚀 Deployment

### Backend Deployment (Heroku/Render)
1. Create a new app on your hosting platform
2. Set environment variables
3. Connect your repository
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Connect your repository
2. Set build command: `npm run build`
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Get connection string
3. Update MONGODB_URI in backend .env

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Material-UI for the beautiful components
- MongoDB for the flexible database
- Cloudinary for image management
- All the open-source libraries that made this project possible

## 📞 Support

For support, email support@sportsera.com or create an issue in the repository.

---

**SportsEra** - Connecting sports enthusiasts worldwide! 🏆