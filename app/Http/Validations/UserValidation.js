const { body } = require("express-validator");
const path = require('path');
function imageValidator(){
    return [
        body("image").custom((image, {req}) => {
            if(Object.keys(req.file).length == 0)  throw "Image is Required";
            const ext = path.extname(req.file.originalname);
            const exts = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
            if(!exts.includes(ext)) throw "Invalid Image Format";
            const maxSize = process.env.MAX_FILE_UPLOAD;
            if(req.file.size > maxSize * 1024 * 1024) throw `Image Size Can Not be Larger than ${maxSize}MB`
            return true;
        })
    ];
}

module.exports = {
    imageValidator
}