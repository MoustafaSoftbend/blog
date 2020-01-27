const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        unique: true,
        maxlength: [50, 'Name Must not ecced 50 characters']
    },
    slug: String,
    email: {
        type: String,
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
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    bcryptjs.genSalt(10, function(err, salt){
        bcrypt.hash(this.password, salt, function(err, hash){
            this.password = hash;
        })
    })
});


module.exports = mongoose.model('User', UserSchema);
