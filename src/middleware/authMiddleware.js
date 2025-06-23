const jwt = require("jsonwebtoken");
require("dotenv").config();
const handler = require("../response/ResponseHandler");
const mc = require("../constant/MessageConstant");
const SECRET_KEY = process.env.SECRET_KEY;
function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (token && token.startsWith('Bearer')) {
        var authheader = token.slice(7, token.length);
        console.log(authheader);
    }
    if (!authheader) return handler(res, mc.TOKEN_ERROR_MSG, mc.TOKEN_ERROR_CODE, null);
    try {
        const decoded = jwt.verify(authheader, SECRET_KEY);
        req.eMail = decoded.useremail;
        next();
    } catch (error) {
        if(error.name === 'TokenExpiredError') {
            return handler(res, mc.EXPIRE_TOKEN_MSG, mc.EXPIRE_TOKEN_CODE, null);
        }
        else{
            return handler(res, mc.INVALID_TOKEN_MSG, mc.INVALID_TOKEN_CODE, null);
        }

    }
};
module.exports = verifyToken;