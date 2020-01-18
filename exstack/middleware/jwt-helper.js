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

// this middleware is to verify 'Authorization' header in request
// if verification is done, req.userId is updated
module.exports = {
    sign: (payload) => {
        return jwt.sign(payload, getJwtKey());
    },
    verifyToken: (req, res, next) => {
        if (!req.headers.authorization) {
            res.statusMessage = "Unauthorized"
            return res.status(401).send('Unauthorized');
        }
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            res.statusMessage = "Unauthorized"
            return res.status(401).send('Unauthorized');
        }
        let payload = jwt.verify(token, getJwtKey());
        if(!payload) {
            res.statusMessage = "Unauthorized"
            return res.status.send('Unauthorized');
        }
        req.userId = payload.subject;
        next();
    }
}

