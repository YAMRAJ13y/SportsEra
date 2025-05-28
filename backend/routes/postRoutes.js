const express = require('express');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  addComment,
  addReply,
  deleteComment
} = require('../controllers/postController');
const { protect, optionalAuth } = require('../middleware/auth');
const {
  validatePost,
  validateComment,
  handleValidationErrors
} = require('../middleware/validation');

const router = express.Router();

// Public routes (with optional auth for user-specific data)
router.get('/', optionalAuth, getPosts);
router.get('/:id', optionalAuth, getPost);

// Protected routes
router.post('/', protect, validatePost, handleValidationErrors, createPost);
router.put('/:id', protect, validatePost, handleValidationErrors, updatePost);
router.delete('/:id', protect, deletePost);

// Like/Unlike
router.post('/:id/like', protect, toggleLike);

// Comments
router.post('/:id/comments', protect, validateComment, handleValidationErrors, addComment);
router.post('/:id/comments/:commentId/replies', protect, validateComment, handleValidationErrors, addReply);
router.delete('/:id/comments/:commentId', protect, deleteComment);

module.exports = router;