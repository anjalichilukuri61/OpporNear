const express = require('express');
const router = express.Router();
const { register, login, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Route for User Registration
router.post('/register', register);

// Route for User Login
router.post('/login', login);

// Route to Update Profile (PROTECTED - requires token)
router.put('/profile', protect, updateProfile);

module.exports = router;
