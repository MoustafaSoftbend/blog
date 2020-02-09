const asyncHandler  = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const Comment = require('../models/Comment');


// @desc     get all comments
// @route    GET /api/v1/comments
// @route    GET /api/v1/auth/users/:user/comments
// @route    GET /api/v1/posts/:postId/posts
// @access   Public/private(admin)
exports.getComments = asyncHandler(async (req, res, next) => {
    if (req.params.userId || req.params.postId) {
        const comments  = await Comment.find({user: req.params.userId, post: req.params.postId});
        return res.status(200).json({
            success: true,
            count: comments.length,
            data: comments
        })
    } else {
        return res.status(200).json(res.advancedResults);
    }
});

// @desc     get single comment
// @route    GET /api/v1/comments/:id
// @access   Public
exports.getComment = asyncHandler(async (req, res, next) => {

    const comment = await (await Comment.findById(req.params.id)).populate({
        path: 'user',
        select: 'name'
    });

    if(!comment) {
        return next(new ErrorResponse('Comment not found', 404))
    }

    res.status(200).json({
        success:true,
        data: comment
    })

});

// @desc     create comment
// @route    POST /api/v1/comments/:id
// @access   Private
exports.addComment = asyncHandler(async (req, res, next) => {

    req.body.author = req.user.id;
    req.body.post = req.params.postId

    const comment = await Comment.create(req.body);

    comment.save();

    res.status(200).json({
        success: true,
        data: comment
    })

});

// @desc     Update comment
// @route    PUT /api/v1/comments/:id
// @access   Private
exports.updateComment = asyncHandler(async (req, res, next) => {

    let comment = await Comment.findById(req.params.id);

    if (!comment) {
        return next(new ErrorResponse('Comment not found', 404));

    }

    if (req.user.id !== comment.author.id && req.user.role !== 'admin') {
        return next(new ErrorResponse('Not allowed to access this route', 401));
    }

    comment = await Comment.findByIdAndUpdate(req.params.id, req.body)

    res.status(200).json({
        success: true,
        data: comment
    })

});

// @desc     Remove comment
// @route    DELETE /api/v1/comments/:id
// @access   Private
exports.removeComment = asyncHandler(async (req, res, next) => {

    let comment = await Comment.findById(req.params.id);

    if (!comment) {
        return next(new ErrorResponse('Comment not found', 404));

    }

    if (req.user !== comment.author.id && req.user.role !== 'admin') {
        return next(new ErrorResponse('Not allowed to access this route', 401));
    }

    await comment.remove();

    res.status(200).json({
        success: true,
        data: {}
    })

});