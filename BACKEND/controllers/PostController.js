const validation = require('../helpers/validate');
const isEmpty = require('../validation/is-empty');
const { getUser } = require("../users");
const JsonApiResponse = require("../helpers/JsonApiResponse");

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

    // let current_user_posts = [];
    // try {
    //     current_user_posts = await Post.find({ 'user': req.user._id }).sort({ date: -1 });
    // } catch (error) {
    //     return res.status(500).json({ success: false, error: "[getPosts Func] Something Went Wrong by Getting Current User Posts!" });
    // }
    user_ids[user_ids.length] = req.user._id;

    let posts;
    try {
        posts = await Post.find({ 'user': { $in: user_ids } }).sort({ date: -1 });
    } catch (error) {
        return JsonApiResponse.error(res, error.message, 500);
    }

    // let all_posts = current_user_posts.concat(posts);
    // socketClient.emit('getPosts', all_posts);
    return JsonApiResponse.success(res, 'Successfully fetched posts', posts);
}

const getCurrentUserPosts = async (req, res) => {
    let current_user_posts;
    try {
        current_user_posts = await Post.find({ 'user': req.user._id }).sort({ date: -1 });
    } catch (error) {
        return res.status(500).json({ success: false, error: "[getPosts Func] Something Went Wrong by Getting Current User Posts!" });
    }
    return res.json(current_user_posts);
}

const getPostById = (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ nopostfound: 'No post found with that ID' }));
}

const createPost = async (req, res) => {
    const validationRules = {
        'text': 'required|string'
    }

    let errors = validation(req.body, validationRules, {});
    if (Object.keys(errors).length > 0) {
        return JsonApiResponse.error(res, 'Invalid request data', 422, errors);
    }

    const { text } = req.body;

    const { id, name, username } = req.user;

    const newPost = new Post({
        text,
        name,
        username,
        image: req.file.path,
        user: id
    })

    let user_ids = await getConnectionsUserIdsList(req.user._id);

    try {
        let created_post = await newPost.save();
        user_ids.forEach(user_id => {
            if (user_id != req.user._id.toString()) {
                let client = getUser(user_id);
                if (client) {
                    client.emit('createPost', created_post);
                }
            }
        });
        return JsonApiResponse.success(res, 'Successfully created post', created_post);
        // socketClient.emit('createPost', post);
        // socketClient.broadcast.emit('createPost', post);
    } catch (error) {
        return JsonApiResponse.error(res, error.message, 500);
    }
}

const updatePost = async (req, res) => {

    const validationRules = {
        'post_id': 'required',
        'text': 'required|string'
    }

    let errors = validation(req.body, validationRules, {});
    if (Object.keys(errors).length > 0) {
        return JsonApiResponse.error(res, 'Invalid request data', 422, errors);
    }

    const { text, post_id } = req.body;

    let post;

    try {
        post = await Post.findById(post_id);
        if (isEmpty(post)) {
            return JsonApiResponse.error(res, 'Post not found', 404);
        }
    } catch (error) {
        return JsonApiResponse.error(res, error.message, 500);
    }

    if (post.user.toString() !== req.user.id) {
        return res.status(404).json({ notauthorized: 'User not authorized' });
    }

    let user_ids = await getConnectionsUserIdsList(post['user']);

    post.text = text;

    try {
        let updated_post = await post.save();
        user_ids.forEach(user_id => {
            if (user_id != req.user._id.toString()) {
                let client = getUser(user_id);
                if (client) {
                    client.emit('updatePost', updated_post);
                }
            }
        });
        return JsonApiResponse.success(res, 'Successfully updated post', updated_post);
    } catch (error) {
        return JsonApiResponse.error(res, error.message, 500);
    }
    // socketClient.emit('updatePost', post);
    // socketClient.broadcast.emit('updatePost', post);
}

const deletePost = async (req, res) => {
    const validationRules = {
        'id': 'required'
    }

    let errors = validation(req.params, validationRules, {});
    if (Object.keys(errors).length > 0) {
        return JsonApiResponse.error(res, 'Invalid request data', 422, errors);
    }

    let post;

    try {
        post = await Post.findById(req.params.id);
        if (isEmpty(post)) {
            return JsonApiResponse.error(res, 'Post not found', 404);
        }
    } catch (error) {
        return JsonApiResponse.error(res, error.message, 500);
    }

    let user_ids = await getConnectionsUserIdsList(post['user']);

    if (post.user.toString() != req.user.id) {
        return JsonApiResponse.error(res, 'You dont have a permission to delete other user post', 401);
    }

    try {
        await post.remove();
        user_ids.forEach(user_id => {
            if (user_id != req.user._id.toString()) {
                let client = getUser(user_id);
                if (client) {
                    client.emit('deletePost', req.params.id);
                }
            }
        });
        return JsonApiResponse.success(res, 'Successfully deleted post', req.params.id);
    } catch (error) {
        return JsonApiResponse.error(res, error.message, 500);
    }
    // socketClient.emit('deletePost', post);
    // socketClient.broadcast.emit('deletePost', post);
}

const likePost = async (req, res) => {

    const validationRules = {
        'id': 'required'
    }

    let errors = validation(req.params, validationRules, {});
    if (Object.keys(errors).length > 0) {
        return JsonApiResponse.error(res, 'Invalid request data', 422, errors);
    }

    let post;
    try {
        post = await Post.findById(req.params.id);
        if (isEmpty(post)) {
            return JsonApiResponse.error(res, 'Post not found', 404);
        }
    } catch (error) {
        return JsonApiResponse.error(res, error.message, 500);
    }

    let user_ids = await getConnectionsUserIdsList(post['user']);
    user_ids[user_ids.length] = post['user'];

    if (post.likes.filter(like => like.user.toString() == req.user._id).length > 0) {
        return JsonApiResponse.error(res, 'User already likes this post', 409);
    }

    try {
        await post.likes.unshift({ user: req.user._id });
        await post.save();
        user_ids.forEach(user_id => {
            if (user_id != req.user._id.toString()) {
                let client = getUser(user_id);
                // console.log(user_id);
                // console.log(user_id != req.user._id);
                if (client) {
                    client.emit('likePost', { post_id: req.params.id, user_id: req.user._id });
                }
            }
        });

        return JsonApiResponse.success(res, 'Successfully liked post', { post_id: req.params.id, user_id: req.user._id });
    } catch (error) {
        return JsonApiResponse.error(res, error.message, 500);
    }
    // socketClient.emit('likePost', post);
    // socketClient.broadcast.emit('likePost', post);
}

const unlikePost = async (req, res) => {
    const validationRules = {
        'id': 'required'
    }

    let errors = validation(req.params, validationRules, {});
    if (Object.keys(errors).length > 0) {
        return JsonApiResponse.error(res, 'Invalid request data', 422, errors);
    }

    let post;
    try {
        post = await Post.findById(req.params.id);
        if (isEmpty(post)) {
            return JsonApiResponse.error(res, 'Post not found', 404);
        }
    } catch (error) {
        return JsonApiResponse.error(res, error.message, 500);
    }

    let user_ids = await getConnectionsUserIdsList(post['user']);
    user_ids[user_ids.length] = post['user'];

    if (post.likes.filter(like => like.user.toString() == req.user._id).length === 0) {
        return res.status(400).json({ error: true, message: 'You have not yet liked this post' });
    }

    // Remove Index
    const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user._id);

    try {
        await post.likes.splice(removeIndex, 1);
        await post.save();

        user_ids.forEach(user_id => {
            if (user_id != req.user._id.toString()) {
                let client = getUser(user_id);
                if (client) {
                    client.emit('unlikePost', { post_id: req.params.id, user_id: req.user._id });
                }
            }
        });

        return JsonApiResponse.success(res, 'Successfully unliked post', { post_id: req.params.id, user_id: req.user._id });
    } catch (error) {
        return JsonApiResponse.error(res, error.message, 500);
    }
    // socketClient.emit('unlikePost', post);
    // socketClient.broadcast.emit('unlikePost', post);
}

const comment = async (req, res) => {
    const validationRules = {
        'post_id': 'required',
        'text': 'required|string'
    }

    let errors = validation(req.body, validationRules, {});
    if (Object.keys(errors).length > 0) {
        return JsonApiResponse.error(res, 'Invalid request data', 422, errors);
    }

    const { text, post_id } = req.body;

    let post;
    try {
        post = await Post.findById(post_id);
        if (isEmpty(post)) {
            return JsonApiResponse.error(res, 'Post not found', 404);
        }
    } catch (error) {
        return JsonApiResponse.error(res, error.message, 500);
    }

    let user_ids = await getConnectionsUserIdsList(post['user']);
    user_ids[user_ids.length] = post['user'];

    // Create comment
    const newComment = {
        text,
        name: req.user.name,
        username: req.user.username,
        user: req.user.id
    };

    try {
        await post.comments.unshift(newComment);
        await post.save();

        user_ids.forEach(user_id => {
            if (user_id != req.user._id.toString()) {
                let client = getUser(user_id);
                if (client) {
                    client.emit('commentPost', { post_id, comment: newComment });
                }
            }
        });

        return JsonApiResponse.success(res, 'Successfully commented post', { post_id, comment: newComment });
    } catch (error) {
        return JsonApiResponse.error(res, error.message, 500);
    }
    // socketClient.emit('commentPost', post);
    // socketClient.broadcast.emit('commentPost', post);
}

exports.getPosts = getPosts;
exports.getCurrentUserPosts = getCurrentUserPosts;
exports.getPostById = getPostById;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.likePost = likePost;
exports.unlikePost = unlikePost;
exports.comment = comment;