const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true, 'Please Enter a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not ecceed 50 characters']
    },
    slug: String,

    content: {
        type: String,
        required: [true, 'Please Enter text content'],
        unique: true,
    },

    category: String,

    created_date: {
        type: Date,
        default: Date.now
    },
    
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Post', PostSchema);
