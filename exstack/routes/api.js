// importing express, router
const express = require('express');
const router = express.Router();

// importing db credentials from file system
const fs = require('fs');
let dbCredential;
try { dbCredential = JSON.parse(fs.readFileSync("./.secret/.db.secret", "utf8"));}
catch (error) {console.error(error);}

// importing mongoose and set db connection string
const mongoose = require('mongoose');
const db = `mongodb+srv://${dbCredential.db_access}:${dbCredential.db_password}@dev-kwvql.gcp.mongodb.net/${dbCredential.db_name}`;

//importing mongoose schema
const User = require('../models/user');

// importing hash function for password hashing
const sha256 = require('js-sha256');
try { sha256Credential = JSON.parse(fs.readFileSync("./.secret/.sha256.secret", "utf8"));}
catch (error) {console.error(error);}


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



// empty endpoint
router.get('/', (req, res) => {
    res.send('From API route');
});


// register endpoint
router.post('/register', (req, res) => {
    let userData = req.body;
    userData.password = sha256.hmac(sha256Credential.key, userData.password); // password hashing
    let user = new User(userData);

    // save user data to mongo db -> use 'save' method
    user.save((error, registeredUser) => {
        if(error) console.log(error);
        else res.status(200).send(registeredUser);
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;
    userData.password = sha256.hmac(sha256Credential.key, userData.password); // password hashing
    
    User.findOne({email: userData.email}, (error, user) => {
        if (error) console.log(error);
        else {
            if (!user) res.status(401).send('Invalid email');
            else if (user.password !== userData.password) res.status(401).send('Invalid password');
            else res.status(200).send(user);
        }
    });
});

router.get('/posts', (req, res) => {
    let posts = [
        {"id": "65ef12", "title": "Test title", "contents": "# test contents", "exposed": false, "priority": "57"},
        {"id": "3adf31", "title": "for testing", "contents": "Heelooo there,\n\n- aqiegjiw\n- qgewijgi\n\nqweigjijiqg\n\nqwegjiji", "exposed": true, "priority": "20"},
        {"id": "720112", "title": "Are we Testing?", "contents": "_**what is this?**_", "exposed": false, "priority": "20"}
    ]

    res.json(posts);
});

router.get('/posts1', (req, res) => {
    let posts = [
        {"title": "for testing", "contents": "Heelooo there,\n\n- aqiegjiw\n- qgewijgi\n\nqweigjijiqg\n\nqwegjiji", "exposed": true, "priority": "20"}
    ]

    res.json(posts);
});

module.exports = router;