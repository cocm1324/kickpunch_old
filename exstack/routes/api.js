const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const db = 'mongodb+srv://kickpunch:firePro17!@dev-kwvql.gcp.mongodb.net/kickpunch';

const User = require('../models/user');

// connect to mongodb
mongoose.connect(db, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => {
    console.log('Connected to mongodb');
}).catch(err => {
    console.error('Error!' + err);
});
mongoose.set('useCreateIndex', true);

router.get('/', (req, res) => {
    res.send('From API route');
});

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);

    // save user data to mongo db -> use 'save' method
    user.save((error, registeredUser) => {
        if(error) console.log(error);
        else res.status(200).send(registeredUser);
    });
});

module.exports = router;