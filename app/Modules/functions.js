const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

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

function createUploadPath(){
    let date = new Date();
    const Year = String(date.getFullYear());
    const Month = String(date.getMonth());
    const Day = String(date.getDate());

    const uploadPath = path.join(__dirname, '..', '..', "public", "uploads", Year, Month, Day);
    fs.mkdirSync(uploadPath, {recursive: true});
    return path.join("public", "uploads", Year, Month, Day);
}

function generateUrl(req, uri){
    let url = config.host + uri.replace(/[\\\\]/gm, "/");
    return url;
}

module.exports = {
    hashString,
    tokenGenerator,
    verifyJwtToken,
    createUploadPath,
    generateUrl
}