 const fileupload = require('express-fileupload');
 const path = require('path');
const { createUploadPath } = require('./functions');
 const uploadFile = async (req, res, next) => {
     if(Object.keys(req.files).length == 0) throw {status: 422, message: "Image is Required"};
     let image = req.files.image;
     const imagePath = path.join(createUploadPath(), Date.now() + path.extname(image.name));
     req.body.image = imagePath;
     let uploadPath = path.join(__dirname, '..', '..', imagePath);
     image.mv(uploadPath, error => {
         if(error) throw {status: 500, message: "Image Upload Failed", success: false};
         next();
     });
 }

 module.exports = {
     uploadFile
 }