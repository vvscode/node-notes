const express = require('express');
const bodyParser = require('body-parser');

const {
  mongoose
} = require('./db/mongoose');
let {
  User
} = require('./models/user');
let {
  Todo,
  validateTodoId,
} = require('./models/todo');

const PORT = process.env.PORT || 3000;

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
    .then((todos) => res.send({
      todos
    }))
    .catch((err) => res.status(500).send(err));
});

app.get('/todos/:todoId', (req, res) => {
  let todoId = req.params.todoId;
  let validatePromise = validateTodoId(todoId);

  // Validate todoId
  // 404

  // findById
  // success
  // todo - send it back
  // no todo - 404
  // error
  // 400 - empty body

  validatePromise
    .then(() => Todo.findById(todoId))
    .then((body) => body ? res.send(body) : res.status(404).send({
      message: 'No Todo found'
    }))
    .catch((e) => {
      console.log(e);
      res.status(400).send({ error: e.message || 'Something went wrong' });
    });
});

app.delete('/todos/:todoId', (req, res) => {
  let todoId = req.params.todoId;
  let validatePromise = validateTodoId(todoId);

  validatePromise
    .then(() => Todo.findByIdAndRemove(todoId))
    .then((todo) => todo ? res.status(200).send(todo) : res.status(404).send({}))
    .catch((err) => res.status(400).send(err));
});

app.listen(PORT, () => console.log(`Server started at http://127.0.0.1:${PORT}`));

module.exports = {
  app
};