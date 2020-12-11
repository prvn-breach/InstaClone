const express = require('express');
const router = express.Router();

// Load Controllers
const UserController = require('../../controllers/UserController');

// Routes
router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUserById);

module.exports = router;