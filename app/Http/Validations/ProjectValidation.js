const { body } = require("express-validator");

function storeProjectValidateion(){
    return [
        body('title').notEmpty().withMessage("Title is Required"),
        body('text').notEmpty().isLength({min: 5}).withMessage("Text is Required and Text Must Be Granted Than 5 Char"),
        body('tags').isArray({min: 1, max: 10}).withMessage("The Number of Tags Must Be More Than 1 and Less Than 10 ")
    ];
}

module.exports = {
    storeProjectValidateion,
}