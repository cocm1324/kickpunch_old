const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const db = 'mongodb+srv://<username>:<password>@dev-kwvql.gcp.mongodb.net/<dbname>';

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



module.exports = router;