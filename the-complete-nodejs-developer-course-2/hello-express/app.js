const HTTP_PORT = 3000;

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from express.js');
});

app.get('/about', (req, res) => res.send({
  text: 'Created via Express.js'
}));

app.get('/bad', (req, res) => res.status(500).send({
  errorMessage: 'Incorrect request handled by /bad'
}));

app.listen(HTTP_PORT);
console.log(`Server started at :${HTTP_PORT}`);