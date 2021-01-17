const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Controllers
const UserController = require('../../controllers/UserController');

router.get('/users', passport.authenticate('jwt', { session: false }), UserController.getUsers);
router.get('/user/current_user', passport.authenticate('jwt', { session: false }), UserController.getCurrentUser);
router.get('/users/all', passport.authenticate('jwt', { session: false }), UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.get('/user/followers', passport.authenticate('jwt', { session: false }), UserController.getFollowers);
router.get('/user/following', passport.authenticate('jwt', { session: false }), UserController.getFollowing);

router.post('/users/follow', passport.authenticate('jwt', { session: false }), UserController.followUser);
router.post('/users/unfollow', passport.authenticate('jwt', { session: false }), UserController.unFollowUser);

module.exports = router;