const validation = require('../helpers/validate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { uuid, isUuid } = require('uuidv4');
const isEmpty = require('../validation/is-empty');

// Load Models
const User = require('../models/User');

const register = (req, res) => {
    const validationRules = {
        'name': 'required|string|min:2',
        'email': 'required|email',
        'username': 'required',
        'password': 'required|confirmed|min:6'
    }
    
    let errors = {};
    validation(req.body, validationRules, {}, (err, status) => {
        if(!status) {
            for (const [key, value] of Object.entries(err.errors)) {
                errors[key] = value[0]
            }
            return res.status(422).json(errors);
        }
    })

    const { name, email, username, password } = req.body;

    User.findOne({ $or: [{name},{email}] })
        .then(user => {
            if(!isEmpty(user)) {
                // Check username and email already exists
                if(username == user.username && email==user.email){
                    errors['username'] = 'Username should be unique.';
                    errors['email'] = 'Email already exists.';
                } else {
                    if(username == user.username) {
                        errors['username'] = 'Username should be unique.';
                    } else if(email==user.email) {
                        errors['email'] = 'Email already exists.';
                    }
                }
                return res.status(422).json(errors);
            } else {
                let newUser = new User({ name, email, username, password });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        // if(err) throw err
                        newUser.password = hash;
                        newUser.save()
                            .then((user) => res.json(user))
                            .catch((err) => res.json(err));
                    });
                }); 
            }
        })
        .catch(err => res.json(err))   
};

const login = (req, res) => {
    const validationRules = {
        'email': 'required|email',
        'password': 'required|integer'
    }

    let errors = {};
    validation(req.body, validationRules, {}, (err, status) => {
        if(!status) {
            for (const [key, value] of Object.entries(err.errors)) {
                errors[key] = value[0]
            }
            res
            .status(422)
            .json(errors);
        }
    })

    const { email, password } = req.body;

    User.findOne({ email })
        .then((user) => {
            if(isEmpty(user)) {
                errors['email'] = 'User not found.';
                return res.status(422).json(errors);
            }

            // Check with hashed password
            bcrypt.compare(password, user.password)
                    .then((isMatch) => {
                        if(isMatch) {
                            const payload = {
                                id: user._id,
                                username: user.username,
                                email: user.email
                            }

                            // Create token 
                            let secret_key = process.env.SECRET_OR_KEY;
                            jwt.sign(payload, secret_key, { expiresIn: 3600 }, (err, token)  => {
                                return res.json({
                                    success: true,
                                    user: user,
                                    token: 'Bearer ' + token
                                })
                            })
                        } else {
                            errors['password'] = 'Password was incorrect.';
                            return res.status(422).json(errors);
                        }
                    })
                    .catch((err) => res.json(err))
        })
        .catch((err) => res.json(err))
};

const resetPassword = (req, res) => {

    const validationRules = {
        'email': 'required|email'
    }

    let errors = {};
    validation(req.body, validationRules, {}, (err, status) => {
        if(!status) {
            for (const [key, value] of Object.entries(err.errors)) {
                errors[key] = value[0]
            }
            res
            .status(422)
            .json(errors);
        }
    })

    User.findOne({ email: req.body.email })
        .then((user) => {
            if(isEmpty(user)) {
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
                if(err) {
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

    let errors = {};
    validation(req.body, validationRules, {}, (err, status) => {
        if(!status) {
            for (const [key, value] of Object.entries(err.errors)) {
                errors[key] = value[0]
            }
            res
            .status(422)
            .json(errors);
        }
    })

    const { password, userId, id } = req.body;

    User.findOne({ _id: userId })
        .then((user) => {
            if(isEmpty(user)){
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }

            // Validate UUID
            if(!isUuid(id)) {
                return res.status(404).json({
                    success: false,
                    message: "Invalid UUID. Please check request params"
                })
            }

            let newPassword = password;
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPassword, salt, (err, hash) => {
                    if(err) throw err;
                    user.password = hash;
                    user.save()
                        .then((data) => res.status(201).json({ success: true, data: data }))
                        .catch((err) => res.json(err))
                })
            })

        })
        .catch((err) => res.json(err))
}

exports.register = register;
exports.login = login;
exports.resetPassword = resetPassword;
exports.changePassword = changePassword;