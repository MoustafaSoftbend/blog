// const mongoose = require('mongoose');
// const bcrypt= require('bcryptjs');
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');

// const UserSchema = new mongoose.Schema({
//     name : {
//         type: String,
//         unique: true,
//         required: [true, 'Please enter a name'],
//         maxlength: [50, 'Name Must not ecced 50 characters']
//     },
//     slug: String,
//     email: {
//         type: String,
//         required: [true, 'Please enter an email'],
//         match: [
//             /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//           'Please add a valid email'
//         ]
//     },
//     role: {
//         type: String,
//         enum: ['user', 'publisher'],
//         default: 'user'
//     },

//     password: {
//         type: String,
//         required: [true, 'Please enter a password'],
//         select: false
//     },

//     image: {
//         type: String,
//         default: 'default_user.png'
//     },

//     resetPasswordToken: String,
//     resetPasswordExpire: Date,
//     emailToken: String,
//     verified: {
//         type: Boolean,
//         default: false
//     },
//     created_date: {
//         type: Date,
//         default: Date.now
//     }
// }, {
//     toJSON: {virtuals: true},
//     toObject: {virtuals:true}
// });

// // Reverse populate with virtuals
// UserSchema.virtual('posts', {
//     ref:'Posts',
//     localField: '_id',
//     foreignField: 'author',
//     jusOne: false
// })

// // Encrypt using bcrypt
// UserSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) {
//         next()
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

// // Sign JWT and return
// UserSchema.methods.getSignedJwtToken = function() {
//     return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRE
//     });
// }

// // Match user entered password to hashed password in database
// UserSchema.methods.matchPassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// }

// // Create reset password token
// UserSchema.methods.setResetPasswordToken = async function() {

//     // Generate Hash
//     const resetToken = crypto.randomBytes(20).toString('hex');

//     // Hash Token and set to reset password field
//     this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

//     // Set Expire
//     this.resetPasswordExpire = Date.now() + 10*60*1000;

//     return resetToken
// }

// //Create email token
// UserSchema.methods.setEmailToken = async function() {
//     const token  = crypto.randomBytes(20).toString('hex');

//     this.emailToken = crypto.createHash('sha256').update(token).digest('hex');

//     return token
// }

// module.exports = mongoose.model('User', UserSchema);

const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const docClient = require("../../config/db");
const { v4: uuidv4 } = require("uuid");

const USERS_TABLE = "Users";

class User {
  constructor(
    name,
    email,
    role = "user",
    password,
    image = "default_user.png",
    verified = false,
  ) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.role = role;
    this.password = password;
    this.image = image;
    this.verified = verified;
    this.created_date = new Date().toISOString();
  }

  // Save User to DynamoDB
  async save() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    const params = {
      TableName: USERS_TABLE,
      Item: { ...this },
    };

    return docClient.put(params).promise();
  }

  // Get Signed JWT Token
  getSignedJwtToken() {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  // Match Password
  async matchPassword(enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
  }

  // Set Reset Password Token
  setResetPasswordToken() {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    const params = {
      TableName: USERS_TABLE,
      Key: { id: this.id },
      UpdateExpression:
        "set resetPasswordToken = :token, resetPasswordExpire = :expire",
      ExpressionAttributeValues: {
        ":token": this.resetPasswordToken,
        ":expire": this.resetPasswordExpire,
      },
    };

    return docClient
      .update(params)
      .promise()
      .then(() => resetToken);
  }

  // Set Email Token
  setEmailToken() {
    const token = crypto.randomBytes(20).toString("hex");
    this.emailToken = crypto.createHash("sha256").update(token).digest("hex");

    const params = {
      TableName: USERS_TABLE,
      Key: { id: this.id },
      UpdateExpression: "set emailToken = :token",
      ExpressionAttributeValues: {
        ":token": this.emailToken,
      },
    };

    return docClient
      .update(params)
      .promise()
      .then(() => token);
  }

  // Find User by Email
  static async findByEmail(email) {
    const params = {
      TableName: USERS_TABLE,
      IndexName: "email-index", // Ensure this index exists in DynamoDB
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    const result = await docClient.query(params).promise();
    return result.Items[0];
  }

  // Find User by ID
  static async findById(id) {
    const params = {
      TableName: USERS_TABLE,
      Key: { id: id },
    };

    const result = await docClient.get(params).promise();
    return result.Item;
  }
}

module.exports = User;
