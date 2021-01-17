const validation = require('../helpers/validate');
const isEmpty = require('../validation/is-empty');
const socket = require("../server");

// Load Models
const User = require('../models/User');
// const { post } = require('../routes/api/auth');

const getUsersByIds = async (user_ids, fields = null) => {
    let users;
    try {
        users = await User.find({ '_id': { $in: user_ids } });
    } catch (error) {
        return { success: false, message: "[getUsersByIds Func] Something Went Wrong!" };
    }

    return { success: true, data: users };
}

const getAllUsers = async (req, res) => {
    let users;
    try {
        users = await User.find({});
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong !"
        })
    }

    res.status(201).json({
        success: true,
        users: users
    })
}

const getUsers = async (req, res) => {
    let current_user = await User.findById(req.user._id, { followers: 1, following: 1 });

    let connected_user_ids = current_user['followers'].concat(current_user['following']);
    let connected_users = await getUsersByIds(connected_user_ids);
    if (!connected_users['success']) {
        res.status(500).json(connected_users);
    }
    connected_users = connected_users['data'];

    let suggestions = [];

    let i = 0;
    while (i < connected_users.length && suggestions.length <= 5) {
        let suggestion_user_ids = connected_users[i]['followers'].concat(connected_users[i]['following']);

        if (suggestion_user_ids.includes(req.user._id)) {
            // Removing Current in list
            suggestion_user_ids.splice(suggestion_user_ids.indexOf(req.user._id), 1);
        }

        suggestions = suggestions.concat(await User.find({ '_id': { $in: suggestion_user_ids } }).limit(5 - suggestions.length));
        i++;
    }

    return res.status(201).json({
        success: true,
        users: suggestions
    })
}

const getUserById = async (req, res) => {
    let user = await getAuthUser(req.params.id);
    if (!user['success']) {
        return res.json(user);
    }

    res.status(201).json({
        success: true,
        user: user['data']
    })
}

const getAuthUser = async (user_id) => {
    let user;
    try {
        user = await User.findById(user_id);
    } catch (err) {
        return {
            success: false,
            message: "[getAuthUser Func] Something went wrong!"
        };
    }

    return {
        success: true,
        data: user
    };
}

const getCurrentUser = async (req, res) => {

    let user = await getAuthUser(req.user._id);
    if (!user['success']) {
        return res.json(user);
    }
    // socket.io.of("/user/getAuthUsers").emit('getAuthUsers', user['data']);

    res.status(201).json({
        success: true,
        user: user['data']
    })
}

const followUser = async (req, res) => {

    const validationRules = {
        'user_id': 'string|required'
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

    let followed_user = await User.findById(req.body.user_id);
    if (isEmpty(followed_user)) {
        return res.status(404).json({ followedusernotfound: 'followed user not found' });
    }

    let current_user = await User.findById(req.user._id);

    if (followed_user['followers'].includes(req.user._id)) {
        return res.status(409).json({ followedalready: 'followed already' });
    } else if (current_user['following'].includes(req.body.user_id)) {
        return res.status(409).json({ followingalready: 'following already' });
    }

    followed_user['followers'].push(req.user._id);
    current_user['following'].push(req.body.user_id);

    let updated_current_user;
    let updated_followed_user;
    try {
        updated_followed_user = await followed_user.save();
        updated_current_user = await current_user.save();
    } catch (e) {
        return res.status(500).json(e);
    }

    socket.io.of("/user/follow").emit('followUser', updated_followed_user);
    socket.io.of("/user/getAuthUsers").emit('getAuthUsers', { current_user: updated_current_user, followed_user: updated_followed_user});

    res.status(200).json({
        message: "Followed Succefully"
    })
}

const unFollowUser = async (req, res) => {

    const validationRules = {
        'user_id': 'string|required'
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

    let unfollowed_user = await User.findById(req.body.user_id);
    if (isEmpty(unfollowed_user)) {
        return res.status(404).json({ unfollowedusernotfound: 'unfollowed user not found' });
    }

    let current_user = await User.findById(req.user._id);

    if (!unfollowed_user['followers'].includes(req.user._id)) {
        return res.status(409).json({ usernotfollowed: 'user not followed' });
    } else if (!current_user['following'].includes(req.body.user_id)) {
        return res.status(409).json({ usernotfollowing: 'user not following' });
    }

    unfollowed_user['followers'].splice(unfollowed_user['followers'].indexOf(req.user._id), 1);
    current_user['following'].splice(unfollowed_user['followers'].indexOf(req.body.user_id), 1);

    let updated_current_user;
    let updated_unfollowed_user;
    try {
        updated_unfollowed_user = await unfollowed_user.save();
        updated_current_user = await current_user.save();
    } catch (e) {
        return res.status(500).json(e);
    }

    socket.io.of("/user/unfollow").emit('unfollowUser', updated_unfollowed_user);
    socket.io.of("/user/getAuthUsers").emit('getAuthUsers', { current_user: updated_current_user, followed_user: updated_unfollowed_user});

    res.status(200).json({
        message: "Unfollowed Succefully"
    })
}

const getFollowers = async (req, res) => {
    let current_user;

    try {
        current_user = await User.findById(req.user._id);
    } catch (error) {
        return res.status(500).json({ success: false, message: "[Getting Auth User] Something Went Wrong!" })
    }


    let followers = await getUsersByIds(current_user['followers']);
    if (!followers['success']) {
        res.status(500).json(followers);
    }

    return res.status(200).json({ success: true, data: followers['data'] });
}

const getFollowing = async (req, res) => {
    let current_user;

    try {
        current_user = await User.findById(req.user._id);
    } catch (error) {
        return res.status(500).json({ success: false, message: "[Getting Auth User] Something Went Wrong!" })
    }


    let following = await getUsersByIds(current_user['following']);
    if (!following['success']) {
        res.status(500).json(following);
    }

    return res.status(200).json({ success: true, data: following['data'] });
}

exports.getUsers = getUsers;
exports.getAllUsers = getAllUsers;
exports.getCurrentUser = getCurrentUser;
exports.getUserById = getUserById;
exports.followUser = followUser;
exports.unFollowUser = unFollowUser;
exports.getFollowers = getFollowers;
exports.getFollowing = getFollowing;