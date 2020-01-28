const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    user_name: {type: String},
    password: {type: String, required: true},
    created: Date,

    // blog information
    title: {type: String},
    description: {type: String}
});
module.exports = mongoose.model('user', userSchema, 'users');