const express = require('express');
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  applyForEvent,
  withdrawFromEvent,
  manageParticipant,
  getUserEvents
} = require('../controllers/eventController');
const { protect, adminOnly, optionalAuth } = require('../middleware/auth');
const {
  validateEvent,
  handleValidationErrors
} = require('../middleware/validation');

const router = express.Router();

// Public routes (with optional auth for user-specific data)
router.get('/', optionalAuth, getEvents);
router.get('/:id', optionalAuth, getEvent);

// Protected routes
router.get('/user/my-events', protect, getUserEvents);
router.post('/:id/apply', protect, applyForEvent);
router.delete('/:id/withdraw', protect, withdrawFromEvent);

// Admin only routes
router.post('/', protect, adminOnly, validateEvent, handleValidationErrors, createEvent);
router.put('/:id', protect, adminOnly, validateEvent, handleValidationErrors, updateEvent);
router.delete('/:id', protect, adminOnly, deleteEvent);
router.put('/:id/participants/:participantId', protect, adminOnly, manageParticipant);

module.exports = router;