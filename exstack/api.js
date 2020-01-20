// importing express, router
const express = require('express');
const router = express.Router();

// importing controller
const User = require('./user/user.controller');
const Post = require('./post/post.controller');

// importing middleware
const jwt = require('./middleware/jwt-helper');
const userId = require('./middleware/user-finder');

// empty endpoint
router.get('/', (req, res) => {
    res.send('Welcome to Kickpunch API ^^7');
});

// user register / login endpoints
router.post('/register', User.register);
router.post('/login', User.login);
router.get('/tokenguard/:userId', userId.findUser, jwt.verifyToken, User.tokenGuard);

// user endpoints
router.get('/user', User.getAllUser);
router.get('/user/currentUser', jwt.verifyToken, User.getUser);
router.get('/user/:userId', userId.findUser, User.getUser);

// post endpoints
router.get('/posts/:userId', userId.findUser, Post.getExposedPostByUser);
router.get('/posts/:userId/all', jwt.verifyToken, Post.getAllPostByUser);
router.get('/post/:postId', Post.getPostById);
router.post('/post', jwt.verifyToken, Post.newPost);

module.exports = router;