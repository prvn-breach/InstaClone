const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    'name': { type: String, required: true },
    'email': { type: String, unique: true, required: true },
    'image': { type: String },
    'username': { type: String, unique: true, required: true },
    'password': { type: String, required: true },
    'date': { type: Date, default: Date.now() }
})

module.exports = User = mongoose.model('users', UserSchema);