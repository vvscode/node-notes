const mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;
// Connection settings
mongoose.connect('mongodb://localhost:27017/TodoApp');

let Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

let newTodo = new Todo({
  text: 'First Todo from mongoose'
});
newTodo.save().then(
  (todo) => console.log('Saved todo:', todo),
  (e) => console.error('Error on saving', e)
);

(new Todo({
  text: 'Another Todo from mongoose',
  completed: true,
  completedAt: Date.now()
})).save()
  .then(
    (todo) => console.log('Saved todo:', todo),
    (e) => console.error('Error on saving', e)
  );