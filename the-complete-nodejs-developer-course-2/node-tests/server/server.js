const PORT = 3000;
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello world!');
});

app.get('/user', (req, res) => {
  res.send({
    user: 'me',
    name: 'VvsCode',
    params: [10, 20, 30]
  })
});

app.listen(PORT, () => console.log(`0.0.0.0:${PORT}`));

module.exports.app = app;