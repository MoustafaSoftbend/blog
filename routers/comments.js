const express = require('express');
const router = express.Router({mergeParams:true});

const {
    getComments,
    getComment,
    addComment ,
    updateComment,
    removeComment
} = require('../controllers/comments')

const Comment = require('../models/Comment');
const {protect, authorize} = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults')

router.route('/')
    .get(advancedResults(Comment,{
        path:'author post',
        select: 'name title'    
    }),getComments)
    .post(protect, addComment)

router.route('/:id')
    .get(getComment)
    .put(protect,updateComment)
    .delete(protect,removeComment)


module.exports = router