const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../api/models/User');
const path = require('path')

const uploadImage = (model) => async (req,res, next) => {

    let Model;
    let id;

    const user = await User.findById(req.user);
    
    if (req.params.id){
        id = req.params.id
        Model = await model.findById(id);
    }  else {
        Model = await User.findById(req.user);
    }


    if (!user || (Model.user && (Model.user != user.id || user.role ==='admin')) ) {
        return next(new ErrorResponse('Not allowed to do the operation', 401))
    }

    const file = req.files.file

    if(!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse('File type not suported', 400));
    }
    
    
    if(file.size > 100000) {
        return next(new ErrorResponse('File size ecceeds limit', 400))
    }

    file.name = `Photo_${Model.id}${path.parse(file.name).ext}`
    

    file.mv(`${process.env.STATIC_PATH}/${Model.constructor.modelName}/${file.name}`, async err => {
        if (err) {
            return next(new ErrorResponse('Server Error', 500))
        }

        if(id){
            await model.findByIdAndUpdate(id, {image: file.name})
        } else {
            await model.findByIdAndUpdate(user.id, {image: file.name})
        }
    }) 
    res.uploadImage = {
        success:true,
        data: file.name
    }
    next();

}

module.exports = uploadImage