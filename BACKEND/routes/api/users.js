const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Controllers
const { getUsers, getUserById, getAllUsers, getFollowers, getFollowing, getSuggestions, followUser, unFollowUser } = require('../../controllers/UserController');

router.get('/users', passport.authenticate('jwt', { session: false }), getUsers);
router.get('/users/all', passport.authenticate('jwt', { session: false }), getAllUsers);
router.get('/users/:id', passport.authenticate('jwt', { session: false }), getUserById);
router.get('/user/followers', passport.authenticate('jwt', { session: false }), getFollowers);
router.get('/user/following', passport.authenticate('jwt', { session: false }), getFollowing);
router.get('/user/suggestions', passport.authenticate('jwt', { session: false }), getSuggestions);
router.post('/users/follow', passport.authenticate('jwt', { session: false }), followUser);
router.post('/users/unfollow', passport.authenticate('jwt', { session: false }), unFollowUser);

module.exports = router;