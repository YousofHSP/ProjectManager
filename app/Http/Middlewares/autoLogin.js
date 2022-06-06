const { User } = require("../../Models/User");
const { verifyJwtToken } = require("../../Modules/functions");

const checkLogin = async (req, res, next) => {
    try{
        const authorization = req?.headers?.authorization;
        if(!authorization) throw {stats: 401, message: "Unauthorized", success: false};
        let token = authorization.substring(7);
        if(!token) throw {stats: 401, message: "Unauthorized", success: false};
        const {username} = verifyJwtToken(token);
        const user = await User.findOne({username}, {password: 0});
        if(!user) throw {stats: 401, message: "Unauthorized", success: false};
        req.user = user;
        next();
    }catch(error){
        next(error);
    }
}

module.exports = {
    checkLogin
}