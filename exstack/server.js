const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const api = require('./routes/api');
const PORT = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);

app.get('/', (req, res) => {
    res.send('Hello from server');
});

app.listen(PORT, () => {
    console.log('Server running on localhost:' + PORT);
});