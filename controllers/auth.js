const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendEmail');
const crypto = require('crypto');
const path = require('path');


// @desc     Register User
// @route    POST /api/v1/auth/register
// @access   Public
exports.regUser = asyncHandler(async(req, res, next) => {
    const user = await User.create(req.body);

    const token = await user.setEmailToken()
    
    user.save({validateBeforeSave: false});

    const confirmUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/users/confirmuser/${token}`;
    
    console.log(confirmUrl);
    const message = `Welcome to our community your account has been created to confirm your account navigate to the following url: ` + confirmUrl

    const options= {
        email: user.email,
        subject: 'Welcome (confirm email)',
        message
    }

    sendMail(options);

    res.status(200).json({
        success: true,
        data: user
    });
})

// @desc     Login user
// @route    POST /api/v1/auth/login
// @access   Public
exports.login = asyncHandler(async (req, res, next) => {

    const {email, password} = req.body;

    if (!email || !password) {
        return next(new ErrorResponse('Please Enter a name and a password', 400));
    }

    const user = await  User.findOne({email}).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid Credentials', 401));
    }

    if (!user.verified){
        return next(new ErrorResponse('Please Confirm your account using link sent to email', 401));
    }

    const match = user.matchPassword(password);

    if (!match) {
        return next(new ErrorResponse('Invalid Credentials', 401));
    }

    sendTokenResponse(user, 200, res);


});

// @desc     Get Me
// @route    GET /api/v1/auth/me
// @access   Private
exports.getMe= asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        data: user
    })
});


// @desc     Log Out User
// @route    GET /api/v1/auth/logout
// @access   Private
exports.logOut= asyncHandler(async (req, res, next) => {

    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10* 1000),
        httpOnly: true
    });


    res.status(200).json({
        success:true,
        data: {}
    })
});

// @desc     Update User
// @route    PUT /api/v1/auth/user/update
// @access   Private
exports.updateUser= asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {...req.body}

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    })
});

// @desc     Update Password 
// @route    POST /api/v1/auth/updatepassword
// @access   Private
exports.updatePassword = asyncHandler(async(req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    if (!await user.matchPassword(req.body.currentPassword)) {
        return next(new ErrorResponse('Password incorrect', 401));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res)
})

// @desc     Send ResetToken 
// @route    POST /api/v1/auth/forgotpassword
// @access   Public
exports.sendResetToken = asyncHandler(async (req, res, next) => {

    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return next(new ErrorResponse('This email is not registered in our database', 401));
    }

    const token = await user.setResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/user/resetpassword/${token}`

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try{
        await sendMail({
            email: user.email,
            subject: 'Password Reset Token',
            message
        });
        res.status(200).json({
            success:true,
            data: 'Email Sent'
        })
    } catch(err) {
        console.log(err);
        user.setResetPasswordToken =undefined;
        user.setResetPasswordExpire=undefined

        await user.save({validateBeforeSave: false});

        return next (new ErrorResponse('Email could not be sent', 500))
    }

    res.status(200).json({
        success: true,
        data: user
    })

});


// @desc     Reset Password 
// @route    POST /api/v1/auth/:token
// @access   Public
exports.resetPassword = asyncHandler (async (req, res, next) => {
    
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    });

    if (!user) {
        return next(new ErrorResponse('Invalid Token', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({validateBeforeSave: false});

    sendTokenResponse(user, 200, res);

}) 


// @desc     Confirm User
// @route    PUT /api/v1/auth/confirmuser/:token
// @access   Public
exports.confirmUser = asyncHandler(async(req, res, next) => {

    const token = req.params.token
    const hashedToken  = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({emailToken: hashedToken});

    if (!user) {
        return next (new ErrorResponse('Operation Not Allowed Invalid token', 401))
    }

    console.log(user)

    user.verified = true
    await user.save({validateBeforeSave: false});

    sendTokenResponse(user, 200, res)
});

// @desc     Upload image
// @route    PUT /api/v1/auth/image
// @access   Private
exports.addImage = asyncHandler(async(req,res,next) => {

    res.status(200).json(res.uploadImage);
})



const sendTokenResponse = (user, statusCode, res) => {
    // Create Token
    const token = user.getSignedJwtToken();


    const options= {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE* 24 * 60 *60 *1000),
        httpOnly: true
    };

    if(process.NODE_ENV === 'production'){
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success:true,
            token
        })

}
