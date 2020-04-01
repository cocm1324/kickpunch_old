const User = require('./user.model');
const jwt = require('../../middleware/jwt-helper');
const common = require('../../common');

module.exports = {
    getUser: (req, res) => {
        const {verifiedUserId} = req.data;

        User.findById(verifiedUserId, (error, user) => {
            if (error) {
                common.errorMessage(res, 500, error);
                return;
            }
            if (!user) {
                common.errorMessage(res, 404);
                return;
            }

            const {_id, user_name, email, title, description} = user;
            const response = {
                _id: _id,
                user_name: user_name,
                email: email,
                title: title,
                description: description
            }

            res.status(200).send({
                RESULT: 1,
                response: response
            });
        });
    },

    getUserFromPost: (req, res) => {
        const {post} = req.data;
        
        if (!post) {
            common.errorMessage(res, 500, 'Post data is missing!');
            return;
        }

        User.findById(post.user_id, (error, user) => {
            if (error) {
                common.errorMessage(res, 500, error);
                return;
            }
            
            if(!user) {
                common.errorMessage(res, 404);
                return;
            }

            const {_id, email, user_name} = user;
            const response = {
                _id: _id,
                email: email,
                user_name: user_name
            };

            res.status(200).send({
                RESULT: 1,
                response: response
            });
        });
    },

    getBlog: (req, res) => {
        const {user} = req.data;
        const {title, description} = user;
        
        const response = {
            title: title,
            description: description
        }

        res.status(200).send({
            RESULT: 1,
            response: response
        });
    },

    updateBlog: (req, res) => {
        const {user_name, title, description} = req.body;
        const {verifiedUserId} = req.data;

        console.log(req.body, verifiedUserId);

        User.findOne({user_name: user_name}, (error, user) => {
            if(error) {
                common.errorMessage(res, 500, error);
                return;
            }
            if(!user) {
                common.errorMessage(res, 404);
                return;
            }
            if(user._id != verifiedUserId) {
                common.errorMessage(res, 403);
                return;
            }

            const request = {
                title: title,
                description: description
            }

            User.findByIdAndUpdate(user._id, request, (error, updatedUser) => {
                if(error) {
                    common.errorMessage(res, 500, error);
                    return;
                }
                if(!updatedUser) {
                    common.errorMessage(res, 404);
                    return;
                }
                res.status(200).send({
                    RESULT: 1,
                    response: "ok"
                });
            });
        });
    },

    register: (req, res) => {
        const {email, password} = req.body
        
        const user_name = email.split('@')[0];
        const request = {
            user_name: user_name,
            email: email,
            password: common.hash(password),
            title: user_name + "'s blog",
            description: "update here to show who you are ^^7",
            created: new Date(),
        }
        
        const new_user = new User(request);

        User.findOne({email: {$regex : "^" + user_name + "@"}}, (findError, duplicateUser) => {
            if (findError) {
                common.errorMessage(res, 500, findError);
                return;
            }
            
            if (duplicateUser) {
                common.errorMessage(res, 410);
                return;
            }
            
            new_user.save((saveError, registeredUser) => {
                if (saveError) {
                    common.errorMessage(res, 500, saveError);
                    return;
                }

                const token = jwt.sign({subject: registeredUser._id});
                const user_info = {
                    email: registeredUser.email,
                    user_name: registeredUser.user_name,
                    created: registeredUser.created
                }
                const response = {
                    token: token,
                    user_info: user_info
                }
                res.status(200).send({
                    RESULT: 1,
                    response: response
                });
            });
        });
    },

    login: (req, res) => {
        const {email, password} = req.body;
        const passwordHash = common.hash(password);

        User.findOne({email: email}, (error, user) => {
            if (error) {
                common.errorMessage(res, 500, error);
                return;
            }
            if (!user) {
                common.errorMessage(res, 404);
                return;
            }
            if (user.password !== passwordHash) {
                common.errorMessage(res, 401);
                return;
            }

            const user_info = {
                email: user.email,
                user_name: user.user_name,
                created: user.created
            }

            const token = jwt.sign({ subject: user._id });
            const response = {
                user: user_info,
                token: token
            }

            res.status(200).send({
                RESULT: 1,
                response: response
            });
        });
    },

    tokenGuard: (req, res) => {
        const {user, verifiedUserId} = req.data;

        if(!verifiedUserId) {
            common.errorMessage(res, 401);
            return;
        }

        if(!user) {
            common.errorMessage(res, 401);
            return;
        }

        if(verifiedUserId != user._id) {
            common.errorMessage(res, 403);
            return;
        }
        
        res.status(200).send({
            RESULT: 1,
        });
    }
}