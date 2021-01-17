const validation = require('../helpers/validate');
const isEmpty = require('../validation/is-empty');

// Load Models
const User = require('../models/User');
// const { post } = require('../routes/api/auth');

const getUsersByIds = async (user_ids, fields = null) => {
    let users;
    try {
        users = await User.find({ '_id': { $in: user_ids } });
    } catch (error) {
        return res.status(500).json({ success: false, message: "[getUsersByIds Func] Something Went Wrong!" });
    }

    return users;
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
    let user;
    try {
        user = await User.findById(req.params.id);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong !"
        })
    }

    res.status(201).json({
        success: true,
        user: user
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

    try {
        await followed_user.save();
        await current_user.save();
    } catch (e) {
        return res.status(500).json(e);
    }

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


    try {
        await unfollowed_user.save();
        await current_user.save();
    } catch (e) {
        return res.status(500).json(e);
    }

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

    return res.status(200).json({ success: true, data: followers });
}

const getFollowing = async (req, res) => {
    let current_user;

    try {
        current_user = await User.findById(req.user._id);
    } catch (error) {
        return res.status(500).json({ success: false, message: "[Getting Auth User] Something Went Wrong!" })
    }


    let following = await getUsersByIds(current_user['following']);

    return res.status(200).json({ success: true, data: following });
}

exports.getUsers = getUsers;
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.followUser = followUser;
exports.unFollowUser = unFollowUser;
exports.getFollowers = getFollowers;
exports.getFollowing = getFollowing;