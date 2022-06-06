const {body} = require('express-validator');
const { User } = require('../../Models/User');
function registerValidator(){
    return [
        body("username").custom(async(value, ctx) => {
            if(value){
                const usernameRexeg = /^([a-z])+[a-z0-9\_\.]{2,}/gi
                if(!usernameRexeg.test(value)) throw "Invalid Username";
                const result = await User.findOne({username: value});
                if(result) throw "Username Already Exists";
                return true;
            }
            throw "username is required"
        }),
        body('email').isEmail().withMessage("Invalid Email").custom( async email => {
            const result = await User.findOne({email});
            if(result) throw "Email Already Exists";
            return true;
        }),
        body("mobile").isMobilePhone("fa-IR").withMessage("Invalid Mobile").custom(async mobile => {
            const resutl = await User.findOne({mobile});
            if(resutl) throw "Mobile Already Exists";
            return true;
        }),
        body('password').isLength({min: 6, max: 16}).withMessage("password must be granted than 6 and less than 16 char").custom((value, ctx) => {
            if(!value) throw "Password is Required";
            if(value !== ctx?.req?.body?.confirm_password) throw "password and password confirm is not equal";
            return true;
        })
    ];
}

module.exports = {
    registerValidator
}