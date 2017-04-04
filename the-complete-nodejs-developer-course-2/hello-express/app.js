const HTTP_PORT = 3000;

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from express.js');
});

app.listen(HTTP_PORT);
console.log(`Server started at :${HTTP_PORT}`);