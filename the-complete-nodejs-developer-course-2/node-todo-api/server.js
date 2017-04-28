const mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;
// Connection settings
mongoose.connect('mongodb://localhost:27017/TodoApp');

let TodoSchema

let Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Number,
    default: Date.now
  }
});


(new Todo({
  text: 'Another Todo from mongoose',
  // completed: true,
  // completedAt: Date.now()
})).save()
  .then(
    (todo) => console.log('Saved todo:', todo),
    (e) => console.error('Error on saving', e)
  );