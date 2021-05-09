const express = require('express');
const router = express.Router();

// Load Controllers
const { register, login, logout, resetPassword, changePassword } = require('../../controllers/AuthController');

// Routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/reset-password', resetPassword);
router.post('/change-password', changePassword);

module.exports = router;