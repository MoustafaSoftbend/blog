const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Please Enter text for comment']
    },

    created_date: {
        type: Date,
        default: Date.now
    },

    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema);