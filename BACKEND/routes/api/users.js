const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Controllers
const { getUsers, getUsersByFilter, getFollowers, getFollowing, getSuggestions, followUser, unFollowUser, getUsersWithStatus } = require('../../controllers/UserController');

router.get('/users', passport.authenticate('jwt', { session: false }), getUsers);
router.get('/get-users-by-filter', passport.authenticate('jwt', { session: false }), getUsersByFilter);
router.get('/user/followers', passport.authenticate('jwt', { session: false }), getFollowers);
router.get('/user/following', passport.authenticate('jwt', { session: false }), getFollowing);
router.get('/user/suggestions', passport.authenticate('jwt', { session: false }), getSuggestions);
router.get('/users/users-statuses', passport.authenticate('jwt', { session: false }), getUsersWithStatus);
router.post('/users/follow', passport.authenticate('jwt', { session: false }), followUser);
router.post('/users/unfollow', passport.authenticate('jwt', { session: false }), unFollowUser);

module.exports = router;