const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Controllers
const { getUsers, getCurrentUser, getUserById, getAllUsers, getFollowers, getFollowing, getSuggestions, followUser, unFollowUser } = require('../../controllers/UserController');

router.get('/users', passport.authenticate('jwt', { session: false }), getUsers);
router.get('/user/current_user', passport.authenticate('jwt', { session: false }), getCurrentUser);
router.get('/users/all', passport.authenticate('jwt', { session: false }), getAllUsers);
router.get('/users/:id', getUserById);
router.get('/user/followers', passport.authenticate('jwt', { session: false }), getFollowers);
router.get('/user/following', passport.authenticate('jwt', { session: false }), getFollowing);
router.get('/user/suggestions', passport.authenticate('jwt', { session: false }), getSuggestions);
router.post('/users/follow', passport.authenticate('jwt', { session: false }), followUser);
router.post('/users/unfollow', passport.authenticate('jwt', { session: false }), unFollowUser);

module.exports = router;