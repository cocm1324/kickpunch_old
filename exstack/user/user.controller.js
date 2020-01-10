const User = require('./user.model');
const sha256 = require('js-sha256');
const fs = require('fs');

// importing hash function for password hashing
const hash = (target) => {
    try {
        sha256Credential = JSON.parse(fs.readFileSync(".secret/.sha256.secret", "utf8"));
    }
    catch (error) {
        console.error(error);
    }

    return sha256.hmac(sha256Credential.key, target);
}


module.exports = {
    register: (req, res) => {
        let userData = req.body;
        userData.password = hash(userData.password) // password hashing
        let user = new User(userData);
    
        // save user data to mongo db -> use 'save' method
        user.save((error, registeredUser) => {
            if(error) console.log(error);
            else res.status(200).send(registeredUser);
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
                else res.status(200).send(user);
            }
        });
    }
}