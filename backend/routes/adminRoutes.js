const express = require('express');
const {
  getDashboardStats,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getPostsForModeration,
  getEventsForManagement
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// All routes are admin only
router.use(protect, adminOnly);

// Dashboard
router.get('/dashboard/stats', getDashboardStats);

// User management
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Content moderation
router.get('/posts', getPostsForModeration);
router.get('/events', getEventsForManagement);

module.exports = router;