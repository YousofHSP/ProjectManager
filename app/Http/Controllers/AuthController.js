const { validationResult } = require("express-validator");
const { User } = require("../../Models/User");
const { hashString } = require("../../Modules/functions");

class AuthController {
    async register(req, res, next){
        const {username, email, mobile, password} = req.body;
        const hashedPassword = hashString(password);
        const result = await User.create({username, email, mobile, password: hashedPassword});
        if(result) {
            return res.status(201).json({
                status: 201,
                success: true,
                message: "User Created Successfuly"
            });
        }
    }
    login(){

    }
    resetPassword(){

    }
}

module.exports = {
    AuthController: new AuthController()
}