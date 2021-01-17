const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../../middleware/file-upload');

// Load Controllers
const PostController = require('../../controllers/PostController');

router.get('/posts', passport.authenticate('jwt', { session: false }), PostController.getPosts);
router.get('/posts/:id', passport.authenticate('jwt', { session: false }), PostController.getPostById);

router.post('/posts', upload.single('image'), passport.authenticate('jwt', { session: false }), PostController.createPost);
router.patch('/posts/:id', passport.authenticate('jwt', { session: false }), PostController.updatePost);
router.delete('/posts/:id', passport.authenticate('jwt', { session: false }), PostController.deletePost);
router.post('/posts/like/:id', passport.authenticate('jwt', { session: false }), PostController.likePost);
router.post('/posts/unlike/:id', passport.authenticate('jwt', { session: false }), PostController.unlikePost);
router.post('/posts/comment/:id', passport.authenticate('jwt', { session: false }), PostController.comment);

module.exports = router