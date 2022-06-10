const { body, param } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const { Team } = require("../../Models/Team");
const { User } = require("../../Models/User");

function teamValidation(){
    return [
        body('name').notEmpty().withMessage("Body is Required"),
        body('description').notEmpty().withMessage("Description is Required"),
        body('username').notEmpty().withMessage("Username is Required").custom(async username => {
            const usernameRegex  = /^([a-z])+([a-z0-9\_\.]){3,}$/gim;
            if(!usernameRegex.test(username)) throw "Invalid Username";
            const result = await Team.findOne({username});
            if(result) throw "Username is Already Exists";
            return true;
        }),
    ];
}

module.exports = {
    teamValidation
}