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
const {protect} = require('../middleware/auth')

router.route('/')
    .get(advancedResults(User),getUsers)
    .post(regUser)

router.route('/:id')
    .get(getUser)
    .put(editUser)
    .delete(deleteUser);

module.exports = router;