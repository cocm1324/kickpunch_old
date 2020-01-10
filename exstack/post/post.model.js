const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const postSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    contents: String,
    exposed: Boolean,
    priority: Number,
    created: Date,
    update: Date,
});
module.exports = mongoose.model('post', postSchema, 'posts');