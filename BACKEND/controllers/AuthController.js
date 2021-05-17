const validation = require('../helpers/validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { uuid, isUuid } = require('uuidv4');
const isEmpty = require('../validation/is-empty');

// Load Models
const User = require('../models/User');
const UsersStatus = require('../models/UsersStatus');
const UserConversation = require('../models/UserConversation');

let socketClient;

const initSocketInAuth = (client) => {
    socketClient = client;
}

const register = async (req, res) => {
    const validationRules = {
        'name': 'required|string|min:2',
        'email': 'required|email',
        'username': 'required',
        'password': 'required|confirmed|min:6'
    }

    let errors = validation(req.body, validationRules, {});
    if (Object.keys(errors).length > 0) {
        return res.status(422).json(errors);
    }

    const { name, email, username, password } = req.body;

    let user = await User.findOne({ $or: [{ name }, { email }] })
    if (!isEmpty(user)) {
        // Check username and email already exists
        if (username == user.username && email == user.email) {
            errors['username'] = 'Username should be unique.';
            errors['email'] = 'Email already exists.';
        } else {
            if (username == user.username) {
                errors['username'] = 'Username should be unique.';
            } else if (email == user.email) {
                errors['email'] = 'Email already exists.';
            }
        }
        return res.status(422).json(errors);
    } else {
        let newUser = new User({ name, email, username, password });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                newUser.password = hash;
                let created_user = await newUser.save();

                // Insert Data into UserStatus
                let users_status = new UsersStatus({ user_id: created_user._id });
                await users_status.save();

                // Create User Conversation
                let user_conversation = new UserConversation({
                    user_id: created_user._id,
                    conversation_users: [],
                    messages: []
                });
                await user_conversation.save();

                return res.json(created_user);
            });
        });
    }
}

const login = async (req, res) => {
    const validationRules = {
        'email': 'required|email',
        'password': 'required|integer'
    }

    let errors = validation(req.body, validationRules, {});
    if (Object.keys(errors).length > 0) {
        return res.status(422).json(errors);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (isEmpty(user)) {
        errors['email'] = 'user has not found.';
        return res.status(422).json(errors);
    }

    // Check with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        errors['password'] = 'The password was incorrect.';
        return res.status(422).json(errors);
    }

    const payload = {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email
    }

    // Remove if it is exists
    await UsersStatus.findOneAndUpdate({ user_id: payload.id }, { socket_id: null, active: true });

    // Create token 
    let SECRET_KEY = process.env.SECRET_OR_KEY;
    jwt.sign(payload, SECRET_KEY, { expiresIn: 36000 }, (err, token) => {
        return res.json({
            success: true,
            user: user,
            token: 'Bearer ' + token
        });
    });
}

const logout  = async (req, res) => {
    const validationRules = {
        'user_id': 'required'
    }

    let errors = validation(req.body, validationRules, {});
    if (Object.keys(errors).length > 0) {
        return res.status(422).json(errors);
    }

    await UsersStatus.findOneAndUpdate({ user_id: req.body.user_id }, { socket_id: null, active: false });

    res.json({
        'message': 'Logout Successfully'
    });
}

const resetPassword = (req, res) => {

    const validationRules = {
        'email': 'required|email'
    }

    let errors = validation(req.body, validationRules, {});
    if (Object.keys(errors).length > 0) {
        return res.status(422).json(errors);
    }

    User.findOne({ email: req.body.email })
        .then((user) => {
            if (isEmpty(user)) {
                errors['email'] = 'User Not Found';
                return res.status(422).json(errors);
            }

            // Nodemailer is used to send mails
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });

            // Mail Config
            const mailOptions = {
                from: process.env.FROM,
                to: process.env.TO,
                subject: 'Reset password',
                html: `<a href="http://localhost:3000/change-password/${user._id}/${uuid()}">Create a New Password</a>`
            }

            // Sending Mail
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    return res.status(201).json({
                        success: true,
                        message: 'Email sent:' + info.response
                    });
                }
            });
        })
        .catch((err) => res.json(err))
}

const changePassword = (req, res) => {
    const validationRules = {
        'password': 'required|confirmed|min:6'
    }

    let errors = validation(req.body, validationRules, {});
    if (Object.keys(errors).length > 0) {
        return res.status(422).json(errors);
    }

    const { password, userId, id } = req.body;

    User.findOne({ _id: userId })
        .then((user) => {
            if (isEmpty(user)) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }

            // Validate UUID
            if (!isUuid(id)) {
                return res.status(404).json({
                    success: false,
                    message: "Invalid UUID. Please check request params"
                })
            }

            let newPassword = password;
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPassword, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save()
                        .then((data) => res.status(201).json({ success: true, data: data }))
                        .catch((err) => res.json(err))
                })
            })

        })
        .catch((err) => res.json(err))
}

exports.initSocketInAuth = initSocketInAuth;
exports.register = register;
exports.login = login;
exports.logout = logout;
exports.resetPassword = resetPassword;
exports.changePassword = changePassword;