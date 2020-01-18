const User = require('../user/user.model');

//this middleware is to get ObjectId of param.userId

module.exports = {
    findUserId: (req, res, next) => {
        let userName;

        if(req.params.userId){
            userName = req.params.userId;
        }
        
        if(req.body.email && userName == undefined) {
            userName = req.body.email.split('@')[0]; 
        }

        if(userName == undefined) {
            return res.status(404).send('Not Found');
        }

        User.findOne({ email: {$regex : "^" + userName + "@"}}, (error, user) => {
            if(error) {
                console.log(error);
            }
            else {
                if(!user) {
                    res.statusMessage = "Not Found"
                    return res.status(404).send('Not Found');
                }
                else {
                    req.userId = user._id;
                }
            }
            next();
        });
    }
}