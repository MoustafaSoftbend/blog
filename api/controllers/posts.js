// const Posts = require("../models/Posts");
// const asyncHandler = require("../middleware/async");
// const ErrorResponse = require("../utils/ErrorResponse");

// // @desc     get all posts
// // @route    GET /api/v1/posts
// // @route    GET /api/v1/auth/users/:userId/posts
// // @access   Public
// exports.getPosts = asyncHandler(async (req, res, next) => {
//   if (req.params.userId) {
//     const posts = await Posts.find({ user: req.params.userId });
//     return res.status(200).json({
//       succes: true,
//       count: posts.length,
//       data: posts,
//     });
//   }
//   res.status(200).json(res.advancedResults);
// });

// // @desc     get a post
// // @route    get /api/v1/posts/:id
// // @access   Public
// exports.getPost = asyncHandler(async (req, res, next) => {
//   post = await Posts.findById(req.params.id).populate({
//     path: "author",
//     select: "name",
//   });

//   if (!post) {
//     return next(new ErrorResponse("Post does not exist", 404));
//   }

//   res.status(200).json({
//     succes: true,
//     data: post,
//   });
// });
// // @desc     Add a post
// // @route    POST /api/v1/posts/:id
// // @access   Private
// exports.addPost = asyncHandler(async (req, res, next) => {
//   req.body.author = req.user.id;

//   post = await Posts.create(req.body);

//   post.save();

//   res.status(200).json({
//     succes: true,
//     data: post,
//   });
// });

// // @desc     Update a post
// // @route    PUT /api/v1/posts/:id
// // @access   Private
// exports.updatePost = asyncHandler(async (req, res, next) => {
//   let post = await Posts.findById(req.params.id);

//   if (!post) {
//     return next(new ErrorResponse("Post Not Found", 404));
//   }

//   if (req.user.id !== post.author.toString() || req.user.role !== "admin") {
//     return next(
//       new ErrorResponse("User not authorized to make changes to post", 401),
//     );
//   }

//   post = await findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({
//     succes: true,
//     data: post,
//   });
// });

// // @desc     Detete a post
// // @route    POST /api/v1/posts/:id
// // @access   Private
// exports.deletePost = asyncHandler(async (req, res, next) => {
//   const post = await Posts.findById(req.params.id);

//   if (!post) {
//     return next(new ErrorResponse("Post Not Found", 404));
//   }

//   if (req.user.id !== post.author.toString() && req.user.role !== "admin") {
//     return next(
//       new ErrorResponse("User not authorized to make changes to post", 401),
//     );
//   }

//   post.remove();

//   res.status(200).json({
//     succes: true,
//     data: {},
//   });
// });

// // @desc     Upload image
// // @route    PUT /api/v1/posts/:id/image
// // @access   Private
// exports.addImage = asyncHandler(async (req, res, next) => {
//   res.status(200).json(res.uploadImage);
// });

const Posts = require("../models/Posts");
const asyncHandler = require("../../middleware/async");
const ErrorResponse = require("../../utils/ErrorResponse");

exports.getAllPosts = asyncHandler(async (req, res, next) => {
  const params = {
    TableName: "Posts",
  };
  const posts = await dynamodb.scan(params).promise();

  if (!posts) {
    return next(new ErrorResponse("Post not found", 404));
  }

  res.status(200).json({
    success: true,
    data: posts,
  });
});

exports.createPost = asyncHandler(async (req, res, next) => {
  const { title, slug, content, image, category, author } = req.body;

  const post = new Posts({ title, slug, content, image, category, author });
  await post.save();

  res.status(201).json({
    success: true,
    data: post,
  });
});

exports.getPostById = asyncHandler(async (req, res, next) => {
  const post = await Posts.findById(req.params.id);

  if (!post) {
    return next(new ErrorResponse("Post not found", 404));
  }

  res.status(200).json({
    success: true,
    data: post,
  });
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  const { title, slug, content, image, category, author } = req.body;

  const post = await Posts.findById(req.params.id);

  if (!post) {
    return next(new ErrorResponse("Post not found", 404));
  }

  post.title = title || post.title;
  post.slug = slug || post.slug;
  post.content = content || post.content;
  post.image = image || post.image;
  post.category = category || post.category;
  post.author = author || post.author;

  await post.update();

  res.status(200).json({
    success: true,
    data: post,
  });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Posts.findById(req.params.id);

  if (!post) {
    return next(new ErrorResponse("Post not found", 404));
  }

  await Post.deleteById(req.params.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
