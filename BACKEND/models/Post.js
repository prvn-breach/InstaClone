const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    'user': { type: Schema.Types.ObjectId, ref: 'users' },
    'name': { type: String, required: true },
    'text': { type: String, required: true },
    'image': { type: String },
    'likes': [
        { 'user': { type: Schema.Types.ObjectId, ref: 'users' } }
    ],
    'comments': [
        { 
            'user': { type: Schema.Types.ObjectId, ref: 'users' },
            'text': { type: String, required: true },
            'name': { type: String },
            'image': { type: String },
            'date': { type: Date, default: Date.now }
        }
    ],
    'date': { type: Date, default: Date.now }
})

module.exports = Post = mongoose.model('posts', PostSchema);