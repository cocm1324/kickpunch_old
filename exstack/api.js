// importing express, router
const express = require('express');
const router = express.Router();

// importing controller
const User = require('./user/user.controller');
const Post = require('./post/post.controller');

// importing middleware
const jwt = require('./middleware/jwt-helper');
const user_finder = require('./middleware/user-finder');

// empty endpoint
router.get('/', (req, res) => {
    res.send('Welcome to Kickpunch API ^^7');
});

// user register / login endpoints
router.post('/register', User.register);
router.post('/login', User.login);
router.get('/tokenguard/:user_name', user_finder.findUser, jwt.verifyToken, User.tokenGuard);

// user endpoints
router.get('/user', User.getAllUser);
router.get('/user/currentUser', jwt.verifyToken, User.getUser);
router.get('/user/:user_name', user_finder.findUser, User.getUser);

// post endpoints
router.get('/posts/:user_name', user_finder.findUser, Post.getExposedPostByUser);
router.get('/posts/:user_name/all', user_finder.findUser, Post.getAllPostByUser);
router.post('/post', jwt.verifyToken, Post.createPost);
router.get('/post/:post_id', Post.getPostById, User.getUserFromPost);
router.put('/post/:post_id', jwt.verifyToken, Post.updatePostById);
router.delete('/post/:post_id', jwt.verifyToken, Post.getPostById, Post.deletePostById);

module.exports = router;