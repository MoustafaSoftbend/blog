const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Please Enter text for comment']
    },

    image: {
        type: String,
        default: 'default_comment.png'
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

module.exports = mongoose.model('Comments', CommentSchema);