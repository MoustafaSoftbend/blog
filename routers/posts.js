const express = require('express')
const router = express.Router({mergeParams:true});
const {
    getPosts,
    getPost,
    addPost,
    updatePost,
    deletePost
} = require('../controllers/posts');


const {getComments} = require('../controllers/comments')

const Posts = require('../models/Posts');
const commentRouter = require('./comments');
const advancedResults = require('../middleware/advancedResults');
const {protect} = require('../middleware/auth');

router.use('/:postId/comments', commentRouter)

router.route('/')
    .get(advancedResults(Posts, {
        path:'author',
        select: 'name'    
    }), getPosts)
    .post(protect, addPost);


router.route('/:id')
    .get(getPost)
    .put(protect,updatePost)
    .delete(protect,deletePost);

module.exports = router;