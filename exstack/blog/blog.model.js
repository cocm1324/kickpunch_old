const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const blogSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {type: String,required: true},
    description: {type: String},
});
module.exports = mongoose.model('user', userSchema, 'users');