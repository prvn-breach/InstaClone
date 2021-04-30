const express = require('express');
const router = express.Router();

// Load Controllers
const { register, login, resetPassword, changePassword, removeUserInStatusList } = require('../../controllers/AuthController');

// Routes
router.post('/register', register);
router.post('/login', login);
router.post('/reset-password', resetPassword);
router.post('/change-password', changePassword);
router.delete('/user_status/:user_id', removeUserInStatusList);

module.exports = router;