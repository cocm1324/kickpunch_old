const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');

const api = require('./api');
const PORT = 3000;
const app = express();

let dbCredential;
try { 
    dbCredential = JSON.parse(fs.readFileSync(".secret/.db.secret", "utf8"));
}
catch (error) {
    console.error(error);
}

const db = `mongodb+srv://${dbCredential.db_access}:${dbCredential.db_password}@dev-kwvql.gcp.mongodb.net/${dbCredential.db_name}`;


// todo: session을 사용해 보자

mongoose.connect(db, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => {
    console.log('Connected to mongodb');
}).catch(err => {
    console.error('Error!' + err);
});
mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);

app.get('/', (req, res) => {
    res.send('Hello from server');
});

app.listen(PORT, () => {
    console.log('Server running on localhost:' + PORT);
});