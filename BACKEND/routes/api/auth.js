const express = require('express');
const router = express.Router();

// Load Controllers
const AuthController = require('../../controllers/AuthController');

// Routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/reset-password', AuthController.resetPassword);
router.post('/change-password', AuthController.changePassword);

module.exports = router;