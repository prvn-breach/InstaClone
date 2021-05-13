const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserConversationSchema = new Schema({
    'user_id': { type: Schema.Types.ObjectId, required: true },
    'conversation_users': [
        {
            'receiver_id': { type: Schema.Types.ObjectId, required: true, },
            'receiver_name': { type: String, required: true },
            'receiver_image': { type: String },
            'receiver_username': { type: String, required: true },
            'followers': { type: Number , default: 0 },
            'posts': { type: Number , default: 0 },
            'date': { type: Date, default: Date.now }
        }
    ],
    'messages': [
        {
            'message': { type: String, required: true},
            'receiver_id': { type: Schema.Types.ObjectId, required: true },
            'sender_id': { type: Schema.Types.ObjectId, required: true },
            'date': { type: Date, default: Date.now }
        }
    ]
})

module.exports = UserConversation = mongoose.model('user_conversations', UserConversationSchema);