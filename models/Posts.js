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

    image: {
        type: String,
        default: 'default_post.png'
    },

    category: String,

    created_date: {
        type: Date,
        default: Date.now
    },
    
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

PostSchema.pre('post', async function(req, res, next) {
    this.author = req.user._id;
});

module.exports = mongoose.model('Post', PostSchema);
