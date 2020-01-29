const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');


exports.protect = asyncHandler(async (req, res, next)=> {
    let token;

    if (req.header.authorization & req.header.authorization.startsWith('Bearer')) {
        token = req.header.authorization.split(' ')[1];
    }

    if (req.coockie.token) {
        token = req.coockie.token;
    }

    if(!token) {
        return new ErrorResponse('Not authorized to access this route', 401)
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.find(decoded.id);

        next();

    }catch (err) {
        return new ErrorResponse('Not authorized to access this route', 401)
    }

})