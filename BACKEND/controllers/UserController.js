// Load Models
const User = require('../models/User');

const getUsers = async (req, res) => {

    let users;
    try {
        users = await User.find({});
    } catch(err) {
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
    } catch(err) {
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

exports.getUsers = getUsers;
exports.getUserById = getUserById;