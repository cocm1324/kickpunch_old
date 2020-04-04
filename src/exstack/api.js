// importing express, router
const express = require('express');
const router = express.Router();

// importing controller
const User = require('./objects/user/user.controller');
const Post = require('./objects/post/post.controller');

// importing middleware
const jwt = require('./middleware/jwt-helper');
const user_finder = require('./middleware/user-finder');

// empty endpoint
router.get('/', (req, res) => {
    res.send('Welcome to Kickpunch API ^^7');
});


router.post('/register', User.register);
router.post('/login', User.login);

router.get('/blog/:user_name', User.getBlog);
router.put('/blog/:user_name', jwt.verifyToken, User.updateBlog);

router.get('/blog/:user_name/post', user_finder.findUser, Post.getBlogPost);

router.get('/posts/:user_name/all', user_finder.findUser, Post.getAllPostByUser);
router.get('/post/:post_id', Post.getPostById, User.getUserFromPost);


router.post('/session', jwt.verifyToken, User.sessionCheck);

// router.get('/user/currentUser', jwt.verifyToken, User.getUser);

router.post('/post', jwt.verifyToken, Post.createPost);
router.put('/post/:post_id', jwt.verifyToken, Post.updatePostById);
router.delete('/post/:post_id', jwt.verifyToken, Post.getPostById, Post.deletePostById);

module.exports = router;