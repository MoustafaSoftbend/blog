const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const sendMail = require('../utils/sendEmail');

// @desc     Get All Users
// @route    GET /api/v1/auth/users
// @access   Private/Admin
exports.getUsers = asyncHandler ( async(req, res, next) => {

    res.status(200).json(res.advancedResults);
});

// @desc     Get Single User
// @route    GET /api/v1/auth/users
// @access   Private/Admin
exports.getUser = asyncHandler(async (req, res, next) =>{
    const user = await User.findById(req.params.id);

    res.status(200).json({
        success:true,
        data: user
    })
});

// @desc     Add a User
// @route    POST /api/v1/auth/users
// @access   Private/Admin
exports.regUser = asyncHandler(async(req, res, next) => {
    const user = await User.create(req.body);
    user.verified = true
    user.save();
    
    res.status(200).json({
        success: true,
        data: user
    });
})

// @desc     Update a User
// @route    PUT /api/v1/auth/users
// @access   Private/Admin
exports.editUser = asyncHandler(async(req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    })
})

// @desc     Delete a User
// @route    DELETE /api/v1/auth/users
// @access   Private/Admin
exports.deleteUser = asyncHandler(async(req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        data: {}
    })
})