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
    getAllUser: (req, res) => {
        // TODO: implement this
    },

    getUser: (req, res) => {
        // TODO: Im not sure about this destructuring method, improve it
        let userId = req.user._id;

        User.findById(userId, (error, user) => {
            if (error) console.log(error);
            else {
                // if user not exist, send 404 not found
                if(!user) {
                    res.status(404).send('Not Found');
                }
                // user의 데이터에서 password 해시 값 제외하고 보냄
                else {
                    // TODO: find better way to send this
                    res.status(200).send({ user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }});
                }
            }
        });
    },

    register: (req, res) => {
        let userData = req.body;
        

        if(!userData) {
            res.statusMessage = 'Invalid Request';
            res.status(401).send('Invalid Request');
        }

        userData.password = hash(userData.password) // password hashing
        let user = new User(userData);
        
        // befor register, check user email already exist in db
        // for here, user name must be unique(ex=> a@a.com, a@b.com => not allowed)
        User.findOne({ email: {$regex : "^" + userData.email.split("@")[0] + "@"}}, (error, duplicateUser) => {
            if (error) console.log(error);
            else {
                // if user exist, send email already exits
                if (duplicateUser) {
                    res.statusMessage = "Already Exists";
                    res.status(401).send('Already Exists');
                }

                // else save user to db
                else {
                    // save user data to mongo db -> use 'save' method
                    user.save((error, registeredUser) => {
                        if(error) console.log(error);
                        else  {
                            let payload = { subject: registeredUser._id };
                            let token = jwt.sign(payload);
                            res.status(200).send({token: token, user: {
                                _id: registeredUser._id,
                                name: registeredUser.name,
                                email: registeredUser.email
                            }});
                        }
                    });         
                }
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
                    res.status(200).send({token: token, user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }});
                }
            }
        });
    },

    //
    tokenGuard: (req, res) => {
        let tokenId = req.userId;
        let guardId = req.user._id;

        if(!tokenId) {
            res.statusMessage = "Invalid Request";
            res.status(400).send("Token is missing");
        }

        if(!guardId) {
            res.statusMessage = "Invalid Request";
            res.status(400).send("User id is missing");
        }

        if(tokenId != guardId) {
            console.log("no");
            res.statusMessage = "Forbidden";
            res.status(403).send("Forbidden");
        }
        else {
            res.status(200).send({message:"ok"});
        }
    }
}