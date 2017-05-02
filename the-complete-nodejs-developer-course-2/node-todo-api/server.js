const express = require('express');
const bodyParser = require('body-parser');

const {
  mongoose
} = require('./db/mongoose');
let {
  User
} = require('./models/user');
let {
  Todo
} = require('./models/todo');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });
  todo.save()
    .then((doc) => res.send(doc))
    .catch((err) => res.status(400).send(err));
});

app.get('/todos', (req, res) => {
  Todo.find({})
    .then((todos) => res.send({ todos }))
    .catch((err) => res.status(500).send(err));
});

app.listen(PORT, () => console.log(`Server started at http://127.0.0.1:${PORT}`));

module.exports = {
  app
};