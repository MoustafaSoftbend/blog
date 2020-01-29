const User = require('../models/User');
const asyncHandler = require('../middleware/async')

// @desc     Get All Users
// @route    GET /api/v1/auth/users
// @access   Private/Admin
exports.getUsers = asyncHandler ( async(req, res, next) => {

    let query;
    
    const reqQuery = {...req.query};
    
    removedFields = ['select', 'limit', 'sort', 'page'];

    removedFields.forEach(item => delete reqQuery[item]);

    let stringQuery = JSON.stringify(reqQuery);
    
    stringQuery = stringQuery.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = User.find(JSON.parse(stringQuery));

    // Select Fields
    if(req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }
    
    // Sort
    if (req.query.sort) {
        const fields = req.query.sort.split(',').join(' ');
        query = query.sort(fields);
    } else {
        query = query.sort('-created_date')
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page -1) * limit;
    const endIndex = page * limit;
    const total = await User.countDocuments();

    query.skip(startIndex).limit(endIndex);

    // if (populate) {
    //     query = query.populate(populate);
    // }

    // Executing the query
    const results = await query;

    // Pagination result
    let pagination = {}

    if(endIndex < total) {
        pagination.next = {
            page: page+1,
            limit
        }
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page-1,
            limit
        }
    }

    res.status(200).json({
        success: true,
        count: results.length,
        pagination,
        data: results
    });
});

// @desc     Get Single User
// @route    GET /api/v1/auth/users
// @access   Private/Admin
exports.getUser = asyncHandler(async (req, res, next) =>{
    const user = await User.findById(req.params.id);

    res.status(200).json({
        success:true,
        data: user
    })
});

// @desc     Add a User
// @route    POST /api/v1/auth/users
// @access   Private/Admin
exports.regUser = asyncHandler(async(req, res, next) => {
    const user = await User.create(req.body);

    res.status(200).json({
        success: true,
        data: user
    });
})

// @desc     Update a User
// @route    PUT /api/v1/auth/users
// @access   Private/Admin
exports.editUser = asyncHandler(async(req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    })
})

// @desc     Delete a User
// @route    DELETE /api/v1/auth/users
// @access   Private/Admin
exports.deleteUser = asyncHandler(async(req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        data: {}
    })
})