/**
 * Cloudinary Config
 * -----------
 * Configuration file for cloudinary media handler
 *
 * ( Please dont copy my api_key and api_secret T_T )
 */

// cloudinary module
const cloudinary = require('cloudinary').v2;

// configuration of cloudinary
cloudinary.config({
    cloud_name: 'dzrmczt5b',
    api_key: '378131248442622',
    api_secret: 'yIOrrVYBbLOG-uULoYKYM-ce1gk'
});

// export cloudinary config
module.exports = {
    cloudinary: cloudinary.uploader
}
