const jwt = require("jsonwebtoken");
const fs = require("fs");

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

module.exports = {
    sign: (payload) => {
        return jwt.sign(payload, getJwtKey());
    },
    verifyToken: (req, res, next) => {
        if (!req.headers.authorization) {
            return req.status(401).send('Unauthorized request');
        }
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).send('Unauthorized request');
        }
        let payload = jwt.verify(token, getJwtKey());
        if(!payload) {
            return res.status.send('Unauthorized request');
        }
        req.userId = payload.subject;
        next();
    }
}

