const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const Schema = mongoose.Schema;
const postSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {type:String, required: true},
    contents: {type:String, required: true},
    exposed: {type:Boolean, required: true},
    priority: {type:Number, required: () => { return this.exposed }},
    created: Date,
    updated: Date,
});
module.exports = mongoose.model('post', postSchema, 'posts');