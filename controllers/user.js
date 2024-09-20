// const User = require('../models/User');
// const asyncHandler = require('../middleware/async');
// const sendMail = require('../utils/sendEmail');

// // @desc     Get All Users
// // @route    GET /api/v1/auth/users
// // @access   Private/Admin
// exports.getUsers = asyncHandler ( async(req, res, next) => {

//     res.status(200).json(res.advancedResults);
// });

// // @desc     Get Single User
// // @route    GET /api/v1/auth/users
// // @access   Private/Admin
// exports.getUser = asyncHandler(async (req, res, next) =>{
//     const user = await User.findById(req.params.id);

//     res.status(200).json({
//         success:true,
//         data: user
//     })
// });

// // @desc     Add a User
// // @route    POST /api/v1/auth/users
// // @access   Private/Admin
// exports.regUser = asyncHandler(async(req, res, next) => {
//     const user = await User.create(req.body);
//     user.verified = true
//     user.save();

//     res.status(200).json({
//         success: true,
//         data: user
//     });
// })

// // @desc     Update a User
// // @route    PUT /api/v1/auth/users
// // @access   Private/Admin
// exports.editUser = asyncHandler(async(req, res, next) => {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true
//     });

//     res.status(200).json({
//         success: true,
//         data: user
//     })
// })

// // @desc     Delete a User
// // @route    DELETE /api/v1/auth/users
// // @access   Private/Admin
// exports.deleteUser = asyncHandler(async(req, res, next) => {
//     const user = await User.findByIdAndDelete(req.params.id);

//     res.status(200).json({
//         success: true,
//         data: {}
//     })
// })

const AWS = require("aws-sdk");
const asyncHandler = require("../middleware/async");
const sendMail = require("../utils/sendEmail");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc     Get All Users
// @route    GET /api/v1/auth/users
// @access   Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  const params = {
    TableName: USERS_TABLE,
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    res.status(200).json({
      success: true,
      data: data.Items,
    });
  } catch (err) {
    return next(new ErrorResponse("Error fetching users", 500));
  }
});

// @desc     Get Single User
// @route    GET /api/v1/auth/users/:id
// @access   Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      id: req.params.id,
    },
  };

  try {
    const data = await dynamoDB.get(params).promise();
    if (!data.Item) {
      return next(new ErrorResponse("User not found", 404));
    }
    res.status(200).json({
      success: true,
      data: data.Item,
    });
  } catch (err) {
    return next(new ErrorResponse("Error fetching user", 500));
  }
});

// @desc     Add a User
// @route    POST /api/v1/auth/users
// @access   Private/Admin
exports.regUser = asyncHandler(async (req, res, next) => {
  const user = { ...req.body, verified: true };
  const params = {
    TableName: USERS_TABLE,
    Item: user,
  };

  try {
    await dynamoDB.put(params).promise();
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return next(new ErrorResponse("Error creating user", 500));
  }
});

// @desc     Update a User
// @route    PUT /api/v1/auth/users/:id
// @access   Private/Admin
exports.editUser = asyncHandler(async (req, res, next) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      id: req.params.id,
    },
    UpdateExpression:
      "set #name = :name, #email = :email, #role = :role, #verified = :verified",
    ExpressionAttributeNames: {
      "#name": "name",
      "#email": "email",
      "#role": "role",
      "#verified": "verified",
    },
    ExpressionAttributeValues: {
      ":name": req.body.name,
      ":email": req.body.email,
      ":role": req.body.role,
      ":verified": req.body.verified,
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const data = await dynamoDB.update(params).promise();
    res.status(200).json({
      success: true,
      data: data.Attributes,
    });
  } catch (err) {
    return next(new ErrorResponse("Error updating user", 500));
  }
});

// @desc     Delete a User
// @route    DELETE /api/v1/auth/users/:id
// @access   Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      id: req.params.id,
    },
  };

  try {
    await dynamoDB.delete(params).promise();
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return next(new ErrorResponse("Error deleting user", 500));
  }
});
