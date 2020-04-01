const User = require('../objects/user/user.model');
const common = require('../common');

module.exports = {
    findUser: (req, res, next) => {
        const {user_name} = req.params;

        if (!req.data) {
            req.data = {}
        } else {
            if (req.data.user) {
                next();
            }
        }
        if (user_name == null) {
            common.errorMessage(res, 401);
            return;
        }

        User.findOne({user_name: user_name}, (error, user) => {
            if(error) {
                common.errorMessage(res, 500, error);
                return;
            }
            if(!user) {
                common.errorMessage(res, 404);
                return;
            }
            req.data['user'] = user;
            next();
        });
    }
}