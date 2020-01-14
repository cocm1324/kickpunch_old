const User = require('./user.model');
const sha256 = require('js-sha256');
const fs = require('fs');
const jwt = require('../middleware/jwt-helper');

// importing hash function for password hashing
const hash = (target) => {
    let sha256Credential;
    let targetString = target.trim();

    try {
        sha256Credential = JSON.parse(fs.readFileSync(".secret/.sha256.secret", "utf8"));
    }
    catch (error) {
        console.error(error);
    }

    return sha256.hmac(sha256Credential.key, targetString);
}

module.exports = {
    register: (req, res) => {
        let userData = req.body;
        userData.password = hash(userData.password) // password hashing
        let user = new User(userData);
        
        // todo: register하기 전 유저의 데이터가 디비에 있는지 한번 검사해야 함


        // save user data to mongo db -> use 'save' method
        user.save((error, registeredUser) => {
            if(error) console.log(error);
            else  {
                let payload = { subject: registeredUser._id };
                let token = jwt.sign(payload);
                res.status(200).send({token});
            }
        });
    },

    login: (req, res) => {
        let userData = req.body;
        userData.password = hash(userData.password)
        
        User.findOne({email: userData.email}, (error, user) => {
            if (error) console.log(error);
            else {
                if (!user) res.status(401).send('Invalid email');
                else if (user.password !== userData.password) res.status(401).send('Invalid password');
                else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload);
                    res.status(200).send({token});
                }
            }
        });
    }
}