const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/authMiddleware');
const { updateUser, changePassword, getCurrentUser } = require('../controllers/userController');

/**
 * Validation middleware
 */
const checkValidation = (req, res, next) => {
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

/**
 * Validate update user request
 */
const validateUpdateUser = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('phone')
    .optional()
    .trim()
    .matches(/^[\d\s\-\(\)\+]+$/)
    .withMessage('Phone number contains invalid characters')
    .custom((value) => {
      if (value && value.replace(/\D/g, '').length < 10) {
        throw new Error('Phone number must contain at least 10 digits');
      }
      return true;
    }),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('avatar')
    .optional()
    .trim()
    .isURL()
    .withMessage('Avatar must be a valid URL')
];

/**
 * Validate change password request
 */
const validateChangePassword = [
  body('oldPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
];

router.get('/profile', authenticateToken, getCurrentUser);

router.put('/profile', authenticateToken, validateUpdateUser, checkValidation, updateUser);

router.put('/password', authenticateToken, validateChangePassword, checkValidation, changePassword);

module.exports = router;
