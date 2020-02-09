const express = require ('express');
const router = express.Router({mergeParams:true});
const {
    getUsers,
    getUser,
    regUser,
    editUser,
    deleteUser
} = require('../controllers/user');



const advancedResults = require('../middleware/advancedResults');
const User = require('../models/User');
const postsRouter = require('./posts');
const commentRouter = require('./comments')
const {protect, authorize} = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.use('/:userId/posts', postsRouter)
router.use('/:userId/comments', commentRouter)

router.route('/')
    .get(advancedResults(User),getUsers)
    .post(regUser)

router.route('/:id')
    .get(getUser)
    .put(editUser)
    .delete(deleteUser);

module.exports = router;