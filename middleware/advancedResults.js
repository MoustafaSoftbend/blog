const advancedResults =(model, populate) => async (req,res,next) => {

    let query;
    
    const reqQuery = {...req.query};
    
    removedFields = ['select', 'limit', 'sort', 'page'];

    removedFields.forEach(item => delete reqQuery[item]);

    let stringQuery = JSON.stringify(reqQuery);
    
    stringQuery = stringQuery.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = model.find(JSON.parse(stringQuery));

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
    const total = await model.countDocuments();

    query.skip(startIndex).limit(endIndex);

    if (populate) {
        query = query.populate(populate);
    }

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

    res.advancedResults = {
        success: true,
        pagination,
        count: results.length,
        data: results
    }

    next();

};

module.exports = advancedResults;