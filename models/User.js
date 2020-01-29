const mongoose = require('mongoose');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        unique: true,
        required: [true, 'Please enter a name'],
        maxlength: [50, 'Name Must not ecced 50 characters']
    },
    slug: String,
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
    },
    role: {
        type: String,
        enum: ['user', 'author'],
        default: 'user'
    },

    password: {
        type: String,
        required: [true, 'Please enter a password'],
        select: false
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
    created_date: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals:true}
});

// Reverse populate with virtuals
UserSchema.virtual('posts', {
    ref:'Posts',
    localField: '_id',
    foreignField: 'author',
    jusOne: false
})

// Encrypt using bcrypt
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPPIRE
    });
}

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);
