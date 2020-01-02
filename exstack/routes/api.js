const express = require('express');
const router = express.Router();

const fs = require('fs');
let dbCredential;

try {
    dbCredential = JSON.parse(fs.readFileSync("./.db.secret", "utf8"));
} catch (error) {
    console.error(error);
}

const mongoose = require('mongoose');
const db = `mongodb+srv://${dbCredential.db_access}:${dbCredential.db_password}@dev-kwvql.gcp.mongodb.net/${dbCredential.db_name}`;

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