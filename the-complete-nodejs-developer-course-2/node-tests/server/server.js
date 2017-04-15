const PORT = 3000;
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(PORT, () => console.log(`0.0.0.0:${PORT}`));

module.exports.app = app;