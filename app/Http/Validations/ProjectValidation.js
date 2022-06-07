const { body } = require("express-validator");

function storeProjectValidateion(){
    return [
        body('title').notEmpty().withMessage("Title is Required"),
        body('text').notEmpty().isLength({min: 5}).withMessage("Text is Required and Text Must Be Granted Than 5 Char"),
        
    ];
}

module.exports = {
    storeProjectValidateion,
}