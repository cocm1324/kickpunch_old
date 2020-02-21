const User = require('../user/user.model');

//this middleware is to get ObjectId of param.userId

module.exports = {
    findUser: (req, res, next) => {
        let user_name;

        if(req.params.user_name){
            user_name = req.params.user_name;
        }
        
        if(req.body.email && userName == undefined) {
            user_name = req.body.email.split('@')[0]; 
        }

        if(user_name == undefined) {
            return res.status(400).send('Undefined');
        }

        User.findOne({ email: {$regex : "^" + user_name + "@"}}, (error, user) => {
            if(error) {
                console.log(error);
            }
            else {
                if(!user) {
                    res.statusMessage = "Not Found"
                    return res.status(404).send('Not Found');
                }
                else {
                    req.user_data = user;
                }
            }
            next();
        });
    }
}