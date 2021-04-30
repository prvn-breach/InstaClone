const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../../middleware/file-upload');

// Load Controllers
const { getPosts, getPostById, createPost, updatePost, deletePost, likePost, unlikePost, comment } = require('../../controllers/PostController');

router.get('/posts', passport.authenticate('jwt', { session: false }), getPosts);
router.get('/posts/:id', passport.authenticate('jwt', { session: false }), getPostById);
router.post('/posts', upload.single('image'), passport.authenticate('jwt', { session: false }), createPost);
router.patch('/posts/:id', passport.authenticate('jwt', { session: false }), updatePost);
router.delete('/posts/:id', passport.authenticate('jwt', { session: false }), deletePost);
router.post('/posts/like/:id', passport.authenticate('jwt', { session: false }), likePost);
router.post('/posts/unlike/:id', passport.authenticate('jwt', { session: false }), unlikePost);
router.post('/posts/comment/:id', passport.authenticate('jwt', { session: false }), comment);

module.exports = router