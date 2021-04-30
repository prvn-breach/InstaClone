const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersStatusSchema = new Schema({
    'socket_id': { type: String, default: undefined },
    'room': { type: String, default: undefined },
    'user_id': { type: Schema.Types.ObjectId, ref: 'users' },
    'active': { type: Boolean, default: false },
    'date': { type: Date, default: Date.now }
});

module.exports = UsersStatus = mongoose.model('users_status', UsersStatusSchema, 'users_status');