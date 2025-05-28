const { body, validationResult } = require('express-validator');

// Handle validation errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User registration validation
exports.validateRegister = [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('gender')
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be male, female, or other'),
  
  body('contactNumber')
    .optional()
    .matches(/^\d{10}$/)
    .withMessage('Contact number must be 10 digits'),
  
  body('primarySport')
    .isIn(['Cricket', 'Hockey', 'Kabaddi', 'Football', 'Tennis', 'Badminton', 'Basketball', 'Table Tennis'])
    .withMessage('Please select a valid primary sport'),
  
  body('skillLevel')
    .isIn(['Beginner', 'Intermediate', 'Advanced'])
    .withMessage('Please select a valid skill level')
];

// User login validation
exports.validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Post creation validation
exports.validatePost = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  
  body('content')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Content must be between 10 and 2000 characters'),
  
  body('sportCategory')
    .optional()
    .isIn(['Cricket', 'Hockey', 'Kabaddi', 'Football', 'Tennis', 'Badminton', 'Basketball', 'Table Tennis', 'General'])
    .withMessage('Please select a valid sport category')
];

// Event creation validation
exports.validateEvent = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  
  body('sportCategory')
    .isIn(['Cricket', 'Hockey', 'Kabaddi', 'Football', 'Tennis', 'Badminton', 'Basketball', 'Table Tennis'])
    .withMessage('Please select a valid sport category'),
  
  body('location')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Location must be between 5 and 200 characters'),
  
  body('dateTime')
    .isISO8601()
    .withMessage('Please provide a valid date and time')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Event date must be in the future');
      }
      return true;
    }),
  
  body('maxParticipants')
    .isInt({ min: 1, max: 1000 })
    .withMessage('Maximum participants must be between 1 and 1000'),
  
  body('entryFee')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Entry fee must be a positive number'),
  
  body('prizeMoney')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Prize money must be a positive number')
];

// Contact message validation
exports.validateContact = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
];

// Comment validation
exports.validateComment = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Comment must be between 1 and 500 characters')
];