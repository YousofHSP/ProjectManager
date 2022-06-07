 const path = require('path');
const { createUploadPath } = require('./functions');
 const uploadFile = async (req, res, next) => {
     if(Object.keys(req.files).length == 0) throw {status: 422, message: "Image is Required"};
     let image = req.files.image;
     let type = path.extname(image.name)
     if(!['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(type)) throw {status: 422, success: false, message: "Invalid Image"};
     const imagePath = path.join(createUploadPath(), Date.now() + type);
     req.body.image = imagePath.substring(6);
     let uploadPath = path.join(__dirname, '..', '..', imagePath);
     image.mv(uploadPath, error => {
         if(error) throw {status: 500, message: "Image Upload Failed", success: false};
         next();
     });
 }

 module.exports = {
     uploadFile
 }