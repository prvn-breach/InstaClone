const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Controllers
const UserController = require('../../controllers/UserController');

// Routes
router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUserById);

router.post('/users/follow', passport.authenticate('jwt', { session: false }), UserController.followUser);

module.exports = router;