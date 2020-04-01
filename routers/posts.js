const express = require('express')
const router = express.Router({mergeParams:true});
const {
    getPosts,
    getPost,
    addPost,
    updatePost,
    deletePost,
    addImage
} = require('../controllers/posts');



const {getComments} = require('../controllers/comments')

const Posts = require('../models/Posts');
const commentRouter = require('./comments');
const advancedResults = require('../middleware/advancedResults');
const uploadImage = require('../middleware/uploadImage');
const {protect, authorize} = require('../middleware/auth');

router.use('/:postId/comments', commentRouter)

router.route('/')
    .get(advancedResults(Posts, {
        path:'author',
        select: 'name'    
    }), getPosts)
    .post(protect,authorize('admin','publisher') , addPost);


router.route('/:id')
    .get(getPost)
    .put(protect,authorize('admin','publisher'),updatePost)
    .delete(protect,authorize('admin','publisher'),deletePost);

router.route('/:id/image').put(protect, authorize('admin', 'publisher'), uploadImage(Posts), addImage);
module.exports = router;