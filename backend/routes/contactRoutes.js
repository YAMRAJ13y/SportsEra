const express = require('express');
const {
  createContactMessage,
  getContactMessages,
  getContactMessage,
  replyToMessage,
  updateMessageStatus,
  deleteContactMessage,
  getUserMessages
} = require('../controllers/contactController');
const { protect, adminOnly, optionalAuth } = require('../middleware/auth');
const {
  validateContact,
  handleValidationErrors
} = require('../middleware/validation');

const router = express.Router();

// Public/User routes
router.post('/', optionalAuth, validateContact, handleValidationErrors, createContactMessage);
router.get('/my-messages', protect, getUserMessages);

// Admin only routes
router.get('/', protect, adminOnly, getContactMessages);
router.get('/:id', protect, adminOnly, getContactMessage);
router.post('/:id/reply', protect, adminOnly, replyToMessage);
router.put('/:id/status', protect, adminOnly, updateMessageStatus);
router.delete('/:id', protect, adminOnly, deleteContactMessage);

module.exports = router;