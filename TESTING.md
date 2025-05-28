# SportsEra Testing Guide

This guide covers how to test the SportsEra application locally and verify all features are working correctly.

## Prerequisites

- Node.js 16+ installed
- MongoDB running locally or MongoDB Atlas connection
- Git installed

## Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd SportsEra-Modern

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Configuration

#### Backend (.env)
```bash
cd backend
cp .env.example .env
# Edit .env with your configuration
```

#### Frontend (.env)
```bash
cd frontend
cp .env.example .env
# Edit .env with your configuration
```

### 3. Start MongoDB

#### Local MongoDB
```bash
mongod
```

#### Or use MongoDB Atlas
Update `MONGODB_URI` in backend/.env with your Atlas connection string.

### 4. Seed Database (Optional)

```bash
cd backend
npm run seed
```

This creates sample users, posts, and events for testing.

### 5. Start Applications

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Testing Checklist

### Authentication Features

#### User Registration
- [ ] Navigate to `/register`
- [ ] Fill out registration form with valid data
- [ ] Submit form and verify success message
- [ ] Check email verification (if email configured)
- [ ] Verify user is created in database

#### User Login
- [ ] Navigate to `/login`
- [ ] Login with registered credentials
- [ ] Verify successful login and redirect
- [ ] Check JWT token in localStorage
- [ ] Verify user data in context

#### Password Reset
- [ ] Navigate to `/forgot-password`
- [ ] Enter registered email
- [ ] Check email for reset link (if email configured)
- [ ] Follow reset link and set new password
- [ ] Login with new password

### User Features

#### Profile Management
- [ ] Navigate to `/profile` (requires login)
- [ ] View current profile information
- [ ] Edit profile details
- [ ] Upload profile picture (requires Cloudinary)
- [ ] Save changes and verify updates

#### Posts System
- [ ] Navigate to `/posts`
- [ ] View list of posts
- [ ] Click on a post to view details
- [ ] Like/unlike posts (requires login)
- [ ] Add comments to posts (requires login)
- [ ] Create new post at `/create-post` (requires login)
- [ ] Edit own posts
- [ ] Delete own posts

#### Events System
- [ ] Navigate to `/events`
- [ ] View list of events
- [ ] Filter events by sport category
- [ ] Click on event to view details
- [ ] Apply for event participation (requires login)
- [ ] Withdraw from event (requires login)
- [ ] View applied events in profile

#### Contact System
- [ ] Navigate to `/contact`
- [ ] Fill out contact form
- [ ] Submit message
- [ ] Verify success confirmation

### Admin Features

#### Admin Login
- [ ] Login with admin credentials (admin@sportsera.com / admin123 if seeded)
- [ ] Verify admin role access
- [ ] Navigate to `/admin`

#### Admin Dashboard
- [ ] View dashboard statistics
- [ ] Check user count, posts count, events count
- [ ] View charts and analytics

#### User Management
- [ ] View all users
- [ ] Edit user details
- [ ] Deactivate/activate users
- [ ] Delete users (with confirmation)

#### Post Moderation
- [ ] View all posts
- [ ] Delete inappropriate posts
- [ ] View post details and comments

#### Event Management
- [ ] Create new events
- [ ] Edit existing events
- [ ] Delete events
- [ ] View event participants
- [ ] Manage participant applications

#### Message Management
- [ ] View contact messages
- [ ] Reply to messages
- [ ] Update message status
- [ ] Delete messages

### API Testing

#### Using curl or Postman

##### Authentication Endpoints
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"password123","gender":"male","primarySport":"Cricket","skillLevel":"Beginner"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

##### Posts Endpoints
```bash
# Get all posts
curl http://localhost:5000/api/posts

# Get single post
curl http://localhost:5000/api/posts/POST_ID

# Create post (requires auth token)
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Test Post","content":"Test content","sportCategory":"Cricket"}'
```

##### Events Endpoints
```bash
# Get all events
curl http://localhost:5000/api/events

# Get single event
curl http://localhost:5000/api/events/EVENT_ID

# Apply for event (requires auth token)
curl -X POST http://localhost:5000/api/events/EVENT_ID/apply \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Error Scenarios

#### Test Error Handling
- [ ] Submit forms with invalid data
- [ ] Access protected routes without authentication
- [ ] Access admin routes with user account
- [ ] Try to edit/delete other users' content
- [ ] Test with malformed API requests
- [ ] Test with expired JWT tokens

#### Network Issues
- [ ] Test with backend offline
- [ ] Test with slow network connections
- [ ] Test with intermittent connectivity

### Performance Testing

#### Load Testing
- [ ] Test with multiple concurrent users
- [ ] Test large file uploads
- [ ] Test with many posts/events loaded
- [ ] Monitor memory usage and response times

#### Browser Testing
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on mobile browsers

### Security Testing

#### Authentication Security
- [ ] Verify JWT tokens expire correctly
- [ ] Test password hashing (passwords not stored in plain text)
- [ ] Test rate limiting on login attempts
- [ ] Verify CORS configuration

#### Input Validation
- [ ] Test XSS prevention in forms
- [ ] Test SQL injection prevention
- [ ] Test file upload restrictions
- [ ] Test input sanitization

## Common Issues and Solutions

### Backend Issues

#### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running locally or check Atlas connection string.

#### JWT Secret Error
```
Error: JWT secret not defined
```
**Solution**: Set JWT_SECRET in .env file.

#### Email Configuration Error
```
Error: Invalid login
```
**Solution**: Check email credentials and app password configuration.

### Frontend Issues

#### API Connection Error
```
Network Error
```
**Solution**: Ensure backend is running and REACT_APP_API_URL is correct.

#### Build Errors
```
Module not found
```
**Solution**: Run `npm install` to ensure all dependencies are installed.

### File Upload Issues

#### Cloudinary Upload Error
```
Error: Invalid cloud name
```
**Solution**: Check Cloudinary configuration in backend .env.

#### File Size Error
```
File too large
```
**Solution**: Check MAX_FILE_SIZE setting in backend .env.

## Test Data

### Sample Users (if seeded)
- **Admin**: admin@sportsera.com / admin123
- **User 1**: john@example.com / user123
- **User 2**: jane@example.com / user123
- **User 3**: mike@example.com / user123

### Sample Data Includes
- 4 users (1 admin, 3 regular users)
- 4 sample posts across different sports
- 4 sample events with different sports and dates
- Sample likes and comments
- Sample event applications

## Automated Testing

### Backend Tests (Future Enhancement)
```bash
cd backend
npm test
```

### Frontend Tests (Future Enhancement)
```bash
cd frontend
npm test
```

### E2E Tests (Future Enhancement)
```bash
npm run test:e2e
```

## Monitoring

### Development Monitoring
- Check browser console for errors
- Monitor network tab for API calls
- Check backend logs for errors
- Monitor database for data consistency

### Production Monitoring
- Set up error tracking (Sentry)
- Monitor API response times
- Track user engagement metrics
- Monitor server resources

## Reporting Issues

When reporting issues, include:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Browser/environment details
5. Console errors (if any)
6. Screenshots (if applicable)

---

For additional support, refer to the main README.md or create an issue in the repository.