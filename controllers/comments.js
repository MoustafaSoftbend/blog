// const asyncHandler  = require('../middleware/async');
// const ErrorResponse = require('../utils/ErrorResponse');
// const Comment = require('../models/Comment');

// // @desc     get all comments
// // @route    GET /api/v1/comments
// // @route    GET /api/v1/auth/users/:user/comments
// // @route    GET /api/v1/posts/:postId/posts
// // @access   Public/private(admin)
// exports.getComments = asyncHandler(async (req, res, next) => {
//     if (req.params.userId || req.params.postId) {
//         const comments  = await Comment.find({user: req.params.userId, post: req.params.postId});
//         return res.status(200).json({
//             success: true,
//             count: comments.length,
//             data: comments
//         })
//     } else {
//         return res.status(200).json(res.advancedResults);
//     }
// });

// // @desc     get single comment
// // @route    GET /api/v1/comments/:id
// // @access   Public
// exports.getComment = asyncHandler(async (req, res, next) => {

//     const comment = await (await Comment.findById(req.params.id)).populate({
//         path: 'user',
//         select: 'name'
//     });

//     if(!comment) {
//         return next(new ErrorResponse('Comment not found', 404))
//     }

//     res.status(200).json({
//         success:true,
//         data: comment
//     })

// });

// // @desc     create comment
// // @route    POST /api/v1/comments/:id
// // @access   Private
// exports.addComment = asyncHandler(async (req, res, next) => {

//     req.body.author = req.user.id;
//     req.body.post = req.params.postId

//     const comment = await Comment.create(req.body);

//     comment.save();

//     res.status(200).json({
//         success: true,
//         data: comment
//     })

// });

// // @desc     Update comment
// // @route    PUT /api/v1/comments/:id
// // @access   Private
// exports.updateComment = asyncHandler(async (req, res, next) => {

//     let comment = await Comment.findById(req.params.id);

//     if (!comment) {
//         return next(new ErrorResponse('Comment not found', 404));

//     }

//     if (req.user.id !== comment.author.id && req.user.role !== 'admin') {
//         return next(new ErrorResponse('Not allowed to access this route', 401));
//     }

//     comment = await Comment.findByIdAndUpdate(req.params.id, req.body)

//     res.status(200).json({
//         success: true,
//         data: comment
//     })

// });

// // @desc     Remove comment
// // @route    DELETE /api/v1/comments/:id
// // @access   Private
// exports.removeComment = asyncHandler(async (req, res, next) => {

//     let comment = await Comment.findById(req.params.id);

//     if (!comment) {
//         return next(new ErrorResponse('Comment not found', 404));

//     }

//     if (req.user !== comment.author.id && req.user.role !== 'admin') {
//         return next(new ErrorResponse('Not allowed to access this route', 401));
//     }

//     await comment.remove();

//     res.status(200).json({
//         success: true,
//         data: {}
//     })

// });

const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");
const Comment = require("../models/Comment");

// @desc     Get all comments
// @route    GET /api/v1/comments
// @route    GET /api/v1/auth/users/:userId/comments
// @route    GET /api/v1/posts/:postId/comments
// @access   Public/private(admin)
exports.getComments = asyncHandler(async (req, res, next) => {
  const { userId, postId } = req.params;

  if (userId || postId) {
    const comments = await Comment.findByAuthorOrPost({ userId, postId });
    return res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } else {
    return res.status(200).json(res.advancedResults);
  }
});

// @desc     Get single comment
// @route    GET /api/v1/comments/:id
// @access   Public
exports.getComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new ErrorResponse("Comment not found", 404));
  }

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// @desc     Create comment
// @route    POST /api/v1/comments/:postId
// @access   Private
exports.addComment = asyncHandler(async (req, res, next) => {
  const { content, image } = req.body;
  const { postId } = req.params;
  const author = req.user.id;

  const comment = new Comment({ content, image, author, post: postId });
  await comment.save();

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// @desc     Update comment
// @route    PUT /api/v1/comments/:id
// @access   Private
exports.updateComment = asyncHandler(async (req, res, next) => {
  const { content, image } = req.body;

  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new ErrorResponse("Comment not found", 404));
  }

  if (req.user.id !== comment.author && req.user.role !== "admin") {
    return next(new ErrorResponse("Not allowed to access this route", 401));
  }

  comment.content = content || comment.content;
  comment.image = image || comment.image;

  await comment.update();

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// @desc     Remove comment
// @route    DELETE /api/v1/comments/:id
// @access   Private
exports.removeComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new ErrorResponse("Comment not found", 404));
  }

  if (req.user.id !== comment.author && req.user.role !== "admin") {
    return next(new ErrorResponse("Not allowed to access this route", 401));
  }

  await Comment.deleteById(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
