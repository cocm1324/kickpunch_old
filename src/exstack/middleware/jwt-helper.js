const jwt = require("jsonwebtoken");
const fs = require("fs");
const common = require("../common");

// get secret of jwt
const getJwtKey = () => {
    let jwtKey

    try {
        jwtKey = JSON.parse(fs.readFileSync(".secret/.jwt.secret", "utf8"));
    }
    catch (error) {
        console.error(error);
    }

    return jwtKey.key;
}

// this middleware is to verify 'Authorization' header in request
// if verification is done, req.userId is updated
module.exports = {
    sign: (payload) => {
        return jwt.sign(payload, getJwtKey());
    },
    verifyToken: (req, res, next) => {
        if (!req.data) {
            req.data = {};
        }

        if (!req.headers.authorization) {
            common.errorMessage(res, 403);
            return;
        }
        const token = req.headers.authorization.split(' ')[1];
        
        if (token === 'null') {
            common.errorMessage(res, 403);
            return;
        }
        const payload = jwt.verify(token, getJwtKey());
        
        if (!payload) {
            common.errorMessage(res, 403);
            return;
        }
        req.data['verifiedUserId'] = payload.subject;
        next();
    }
}

