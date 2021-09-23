// multer to store add the file variable to the request for images
const multer = require('multer');
// upload destination in the server
const upload = multer({dest: "uploads/"});

// uploads
const uploads = {
    singleUpload: upload.single("image")
}

// export the uploads data
module.exports = uploads;
