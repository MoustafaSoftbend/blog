const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addImage,
} = require("../controllers/posts");

const { getComments } = require("../controllers/comments");

const Posts = require("../models/Posts");
const commentRouter = require("./comments");
const advancedResults = require("../middleware/advancedResults");
const uploadImage = require("../middleware/uploadImage");
const { protect, authorize } = require("../middleware/auth");

router.use("/:postId/comments", commentRouter);

router
  .route("/")
  .get(Posts, getAllPosts)
  .post(protect, authorize("admin", "publisher"), createPost);

router
  .route("/:id")
  .get(getPostById)
  .put(protect, authorize("admin", "publisher"), updatePost)
  .delete(protect, authorize("admin", "publisher"), deletePost);

router.route("/:id/image");
//   .put(protect, authorize("admin", "publisher"), uploadImage(Posts), addImage);
module.exports = router;
