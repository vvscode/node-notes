const HTTP_PORT = 3000;

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => err && console.error('Unable to write log'));
  next();
});

hbs.registerHelper('currentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => (text || '').toUpperCase());

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
