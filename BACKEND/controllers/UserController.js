const validation = require('../helpers/validate');
const isEmpty = require('../validation/is-empty');

// Load Models
const User = require('../models/User');
const { post } = require('../routes/api/auth');

const getUsers = async (req, res) => {

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

    let no_of_followers = followed_user['followers'].length;
    let no_of_following = current_user['following'].length;

    followed_user['followers'][no_of_followers] = req.user._id;
    current_user['following'][no_of_following] = req.body.user_id;
    
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

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.followUser = followUser;