// importing express, router
const express = require('express');
const router = express.Router();

// importing controller
const User = require('./user/user.controller');
const Post = require('./post/post.controller');

// importing middleware
const jwt = require('./middleware/jwt-helper');
const userId = require('./middleware/user-id-finder');

// empty endpoint
router.get('/', (req, res) => {
    res.send('Welcome to Kickpunch API ^^7');
});

// user register / login endpoints
router.post('/register', User.register);
router.post('/login', User.login);

// user endpoints
router.get('/user', User.getAllUser);
router.get('/user/:email', User.getUserByEmail);

// post endpoints
router.get('/post/:userId', userId.findUserId, Post.getExposedPostByUser);
router.get('/post/:userId/all', jwt.verifyToken, Post.getAllPostByUser);
router.post('/post/:userId', jwt.verifyToken, Post.createPost);

module.exports = router;