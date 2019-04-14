const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello from board');
});

app.listen(5000, () => {
    console.log('Listening in 5000');
});
