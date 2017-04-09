const HTTP_PORT = 3000;

const express = require('express');
const hbs = require('hbs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.send('Hello from express.js');
});

app.get('/about', (req, res) =>
  // Both will work  
  // res.render('about', {
  res.render('about.hbs', {
    text: 'Created via Express.js',
    options: [
      'one',
      'two',
      'three'
    ]
  }));

app.get('/bad', (req, res) => res.status(500).send({
    errorMessage: 'Incorrect request handled by /bad',
  }));

app.listen(HTTP_PORT, () => console.log(`Server started at :${HTTP_PORT}`));
