const { validationResult } = require("express-validator");
const { User } = require("../../Models/User");
const { hashString, tokenGenerator } = require("../../Modules/functions");
const bcrypt = require('bcrypt');

class AuthController {
    async register(req, res, next){
        const {username, email, mobile, password} = req.body;
        const hashedPassword = hashString(password);
        const result = await User.create({username, email, mobile, password: hashedPassword});
        if(result) {
            return res.status(201).json({
                status: 201,
                success: true,
                message: "User Created successfully"
            });
        }
    }
    async login(req, res, next){
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if(!user) throw {status: 422, message: "Invalid Username or Password", success: false};
            if(!bcrypt.compareSync(password, user.password)) throw {status: 422, message: "Invalid Username or Password", success: false};

            const token = tokenGenerator({username});
            user.token = token;
            user.save();

            return res.json({status: 200, message: "Login was successfully", success: true, data: {token}});

        } catch (error) {
            next(error);
        }
    }
    resetPassword(){

    }
}

module.exports = {
    AuthController: new AuthController()
}