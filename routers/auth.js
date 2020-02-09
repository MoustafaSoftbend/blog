const express = require('express');
const router = express.Router();

const {protect, authorize} = require('../middleware/auth');

const {
    regUser,
    login,
    logOut,
    getMe,
    updateUser,
    sendResetToken,
    updatePassword,
    resetPassword,
    confirmUser
}  = require ('../controllers/auth');

router.route('/register').post(regUser);

router.route('/users/confirmuser/:token').put(confirmUser);

router.route('/login').post(login);

router.route('/logout').get(protect, logOut);

router.route('/me').get(protect,getMe);

router.route('/user/update').put(protect,updateUser);

router.route('/user/forgotpassword').post(sendResetToken);

router.route('/user/resetpassword/:token').put(resetPassword);

router.route('/user/updatepassword').put(protect,updatePassword);


module.exports = router;