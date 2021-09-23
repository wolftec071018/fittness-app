// cloudinary module
const { cloudinary } = require('../config/cloudinary.config');
// path module
const path = require('path');

// image uploader
const uploader = (req, folderName, cb) => {
    const filePath = req.file.path;  // file path
    const today = new Date().toISOString()  // current date
    let fileName = path.parse(req.file.originalname).name;  // file name without extension
    const uniqueFileName = `${today}-${fileName}`  // unique file name

    // upload to cloudinary
    cloudinary.upload(
        filePath,
        {
            folder: folderName,  // folder based on the athlete's id
            public_id: uniqueFileName  // file name
        },
        cb  // call back function
    )
    .catch(err => {
        return {
            message: err.message,
            status: 500
        }
    });
}

// upload function export
module.exports = {
    uploader: uploader
}