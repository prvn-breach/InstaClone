const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersStatusSchema = new Schema({
    'user_id': { type: Schema.Types.ObjectId, ref: 'users' },
    'active': { type: Boolean, default: false },
    'date': { type: String, required: true }
});

module.exports = UsersStatus = mongoose.model('users_status', UsersStatusSchema, 'users_status');