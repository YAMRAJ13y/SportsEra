# SportsEra Deployment Guide

This guide covers deploying the SportsEra application to various platforms.

## Prerequisites

- Node.js 16+ installed
- MongoDB database (local or MongoDB Atlas)
- Cloudinary account for image storage
- Email service (Gmail with app password recommended)

## Environment Setup

### Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sportsera

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-jwt-key-change-in-production
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@sportsera.com

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Frontend URL
FRONTEND_URL=https://your-frontend-domain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=https://your-backend-domain.com/api
REACT_APP_APP_NAME=SportsEra
REACT_APP_APP_VERSION=1.0.0
```

## Deployment Options

### Option 1: Heroku (Backend) + Vercel (Frontend)

#### Backend Deployment to Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku create sportsera-backend
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set JWT_SECRET=your-jwt-secret
   heroku config:set JWT_REFRESH_SECRET=your-refresh-secret
   heroku config:set EMAIL_HOST=smtp.gmail.com
   heroku config:set EMAIL_PORT=587
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASS=your-app-password
   heroku config:set EMAIL_FROM=noreply@sportsera.com
   heroku config:set CLOUDINARY_CLOUD_NAME=your-cloud-name
   heroku config:set CLOUDINARY_API_KEY=your-api-key
   heroku config:set CLOUDINARY_API_SECRET=your-api-secret
   heroku config:set FRONTEND_URL=https://your-frontend-domain.vercel.app
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

#### Frontend Deployment to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd frontend
   vercel --prod
   ```

4. **Set Environment Variables in Vercel Dashboard**
   - Go to your project in Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Add `REACT_APP_API_URL` with your Heroku backend URL

### Option 2: Render (Full Stack)

#### Backend Deployment to Render

1. **Connect Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" > "Web Service"
   - Connect your GitHub repository
   - Select the backend directory

2. **Configure Service**
   - Name: `sportsera-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Set Environment Variables**
   Add all the environment variables from the backend `.env` file

#### Frontend Deployment to Render

1. **Create Static Site**
   - Click "New" > "Static Site"
   - Connect your repository
   - Select the frontend directory

2. **Configure Build**
   - Build Command: `npm run build`
   - Publish Directory: `build`

3. **Set Environment Variables**
   Add the frontend environment variables

### Option 3: DigitalOcean App Platform

1. **Create App**
   - Go to DigitalOcean App Platform
   - Create new app from GitHub repository

2. **Configure Components**
   - Add backend as a service
   - Add frontend as a static site

3. **Set Environment Variables**
   Configure environment variables for both components

## Database Setup

### MongoDB Atlas

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a new cluster
   - Choose your preferred region

2. **Create Database User**
   - Go to Database Access
   - Add new database user
   - Set username and password

3. **Configure Network Access**
   - Go to Network Access
   - Add IP address (0.0.0.0/0 for all IPs or specific IPs)

4. **Get Connection String**
   - Go to Clusters > Connect
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## Email Setup

### Gmail Configuration

1. **Enable 2-Factor Authentication**
   - Go to Google Account settings
   - Enable 2-factor authentication

2. **Generate App Password**
   - Go to Security > App passwords
   - Generate password for "Mail"
   - Use this password in EMAIL_PASS environment variable

## Cloudinary Setup

1. **Create Account**
   - Go to [Cloudinary](https://cloudinary.com)
   - Create free account

2. **Get Credentials**
   - Go to Dashboard
   - Copy Cloud Name, API Key, and API Secret
   - Add to environment variables

## SSL/HTTPS

### Automatic SSL (Recommended)

Most platforms (Vercel, Render, Heroku) provide automatic SSL certificates.

### Custom Domain

1. **Add Custom Domain**
   - Configure custom domain in your hosting platform
   - Update DNS records as instructed

2. **Update Environment Variables**
   - Update FRONTEND_URL in backend
   - Update REACT_APP_API_URL in frontend

## Monitoring and Logging

### Backend Logging

The application uses Morgan for HTTP request logging. In production:

```javascript
// Add to server.js for production logging
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
}
```

### Error Tracking

Consider adding error tracking services:

- **Sentry**: For error monitoring
- **LogRocket**: For session replay
- **DataDog**: For comprehensive monitoring

## Performance Optimization

### Backend Optimizations

1. **Enable Compression**
   ```bash
   npm install compression
   ```

2. **Add to server.js**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

### Frontend Optimizations

1. **Build Optimization**
   ```bash
   npm run build
   ```

2. **Bundle Analysis**
   ```bash
   npm install -g webpack-bundle-analyzer
   npx webpack-bundle-analyzer build/static/js/*.js
   ```

## Security Checklist

- [ ] Use HTTPS in production
- [ ] Set strong JWT secrets
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Validate all inputs
- [ ] Use environment variables for secrets
- [ ] Enable security headers (Helmet)
- [ ] Regular dependency updates

## Backup Strategy

### Database Backup

1. **MongoDB Atlas**
   - Automatic backups are enabled by default
   - Configure backup retention policy

2. **Manual Backup**
   ```bash
   mongodump --uri="your-mongodb-uri" --out=backup-folder
   ```

### File Backup

- Cloudinary automatically handles image backups
- Consider additional backup for critical files

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check FRONTEND_URL in backend environment
   - Verify CORS configuration

2. **Database Connection**
   - Verify MongoDB URI
   - Check network access settings

3. **Email Not Sending**
   - Verify email credentials
   - Check app password configuration

4. **Image Upload Failing**
   - Verify Cloudinary credentials
   - Check file size limits

### Logs

- **Heroku**: `heroku logs --tail`
- **Render**: Check logs in dashboard
- **Vercel**: Check function logs in dashboard

## Scaling Considerations

### Horizontal Scaling

- Use load balancers for multiple backend instances
- Consider database read replicas
- Implement caching (Redis)

### Vertical Scaling

- Monitor resource usage
- Upgrade server specifications as needed

## Maintenance

### Regular Tasks

- [ ] Update dependencies monthly
- [ ] Monitor error logs weekly
- [ ] Check performance metrics
- [ ] Review security updates
- [ ] Backup verification

### Updates

1. **Test in Staging**
   - Deploy to staging environment first
   - Run comprehensive tests

2. **Production Deployment**
   - Deploy during low-traffic periods
   - Monitor for issues post-deployment

---

For support or questions, please refer to the main README.md or create an issue in the repository.