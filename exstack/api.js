// importing express, router
const express = require('express');
const jwt = require('./middleware/jwt-helper');
const router = express.Router();

const User = require('./user/user.controller');
const Post = require('./post/post.controller');


// empty endpoint
router.get('/', (req, res) => {
    res.send('From API route');
});

// user endpoints
router.post('/users/register', User.register);
router.post('/users/login', User.login);

// 
router.get('/posts', jwt.verifyToken, Post.posts);
router.get('/posts/posts1', Post.posts1);
router.post('/posts/create', Post.create);

module.exports = router;