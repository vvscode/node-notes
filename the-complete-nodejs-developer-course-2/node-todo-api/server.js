const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res, next) => {
  console.log('POST /todos', req.body);

  let todo = new Todo({
    text: req.body.text
  });
  todo.save()
    .then((doc) => res.send(doc))
    .catch((err) => res.status(400).send(err));
});

app.listen(PORT, () => console.log(`Server started at http://127.0.0.1:${PORT}`));