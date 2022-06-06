const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function hashString(str){
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt);
}

function tokenGenerator(payload){
    const token = jwt.sign(payload, config.jwt.secretKey, {expiresIn: config.jwt.expiresIn});
    return token;
}

function verifyJwtToken(token){
    const result = jwt.verify(token, config.jwt.secretKey);
    if(!result?.username) throw {stats: 401, message: "Unauthorized", success: false};
    return result;
}

module.exports = {
    hashString,
    tokenGenerator,
    verifyJwtToken
}