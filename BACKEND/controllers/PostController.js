const validation = require('../helpers/validate');
const isEmpty = require('../validation/is-empty');
const socket = require("../server");

// Load Models
const Post = require('../models/Post');
const User = require('../models/User');

const getConnectionsUserIdsList = async (user_id) => {
    let current_user;
    try {
        current_user = await User.findById(user_id, { followers: 1, following: 1 });
    } catch (error) {
        return res.status(500).json({ success: false, error: "User Not Found" });
    }

    let users = current_user['followers'].concat(current_user['following']);
    return users;
}

const getPosts = async (req, res) => {

    let user_ids = await getConnectionsUserIdsList(req.user._id);

    let current_user_posts;
    try {
        current_user_posts = await Post.find({ 'user': req.user._id }).sort({ date: -1 });
    } catch (error) {
        return res.status(500).json({ success: false, error: "[getPosts Func] Something Went Wrong by Getting Current User Posts!" });
    }

    let posts;
    try {
        posts = await Post.find({ 'user': { $in: user_ids } }).sort({ date: -1 });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Something Went Wrong For Getting Posts!" });
    }

    let all_posts = current_user_posts.concat(posts);
    socket.io.of("/posts/get").emit('getPosts', all_posts);
    return res.json(all_posts);
}

const getPostById = (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ nopostfound: 'No post found with that ID' }));
}

const createPost = (req, res) => {
    const validationRules = {
        'text': 'required|string'
    }

    let errors = {};
    validation(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            for (const [key, value] of Object.entries(err.errors)) {
                errors[key] = value[0]
            }
            return res.status(422).json(errors);
        }
    })

    const { text } = req.body;

    const { id, name } = req.user;

    const newPost = new Post({
        text,
        name: name,
        image: req.file.path,
        user: id
    })

    newPost.save()
        .then(post => {
            res.json(post);
            socket.io.of("/posts/create").emit('createPost', post);
        })
        .catch(err => res.status(500).json(err));
}

const updatePost = (req, res) => {

    const validationRules = {
        'text': 'required|string'
    }

    let errors = {};
    validation(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            for (const [key, value] of Object.entries(err.errors)) {
                errors[key] = value[0]
            }
            return res.status(422).json(errors);
        }
    })

    const { text } = req.body;

    Post.findById(req.params.id).then((post) => {

        if (isEmpty(post)) {
            return res.status(404).json({ postnotfound: 'No post found' });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(404).json({ notauthorized: 'User not authorized' });
        }

        post.text = text;

        post.save()
            .then(post => {
                res.json(post);
                socket.io.of("/posts/update").emit('updatePost', post);
            })
            .catch(err => res.status(500).json(err));
    })
}

const deletePost = (req, res) => {
    Post.findById(req.params.id).then((post) => {

        if (isEmpty(post)) {
            return res.status(404).json({ postnotfound: 'No post found' });
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(404).json({ notauthorized: 'User not authorized' });
        }

        post.remove()
            .then((post) => {
                res.json({ success: true });
                socket.io.of("/posts/delete").emit('deletePost', post);
            })
            .catch(err => res.status(500).json(err));
    })
}

const likePost = (req, res) => {
    Post.findById(req.params.id).then(post => {
        if (post.likes.filter(like => like.user.toString() == req.user.id).length > 0) {
            return res.status(400).json({ error: true,  message: 'User already likes this post' });
        }

        // like
        post.likes.unshift({ user: req.user.id });

        //save
        post.save().then(post => {
            res.json(post);
            socket.io.of("/posts/like").emit('likePost', post);
        });
    });
}

const unlikePost = (req, res) => {
    Post.findById(req.params.id).then(post => {
        if (post.likes.filter(
            like => like.user.toString() == req.user.id
        ).length === 0) {
            return res
                .status(400)
                .json({ error: true,  message: 'You have not yet liked this post' });
        }

        // Remove Index
        const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

        // Splice out of array
        post.likes.splice(removeIndex, 1);

        // Save
        post.save().then(post => {
            res.json(post);
            socket.io.of("/posts/unlike").emit('unlikePost', post);
        });
    });
}

const comment = (req, res) => {

    const validationRules = {
        'text': 'required|string'
    }

    let errors = {};
    validation(req.body, validationRules, {}, (err, status) => {
        if (!status) {
            for (const [key, value] of Object.entries(err.errors)) {
                errors[key] = value[0]
            }
            return res.status(422).json(errors);
        }
    })

    Post.findById(req.params.id)
        .then(post => {
            const { text, name, avatar } = req.body;

            // Create comment
            const newComment = {
                text,
                name: req.user.name,
                user: req.user.id
            };

            // Add comments to array
            post.comments.unshift(newComment);

            // Save
            post.save().then(post => {
                res.json(post);
                socket.io.of("/posts/comment").emit('commentPost', post);
            })
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(404).json({ error: true,  message: 'No Post found for that ID' }));
}

exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.likePost = likePost;
exports.unlikePost = unlikePost;
exports.comment = comment;