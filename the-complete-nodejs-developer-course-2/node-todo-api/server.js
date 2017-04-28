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
    minlength: 1,
    trim: true,
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

let User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    validate: {
      validator: (value) => /\w@\w/.test(value),
      message: '{VALUE} should be valid email',
    },
  }
});


(new User({
  email: 'some@email',
  // completed: true,
  // completedAt: Date.now()
})).save()
  .then(
    (todo) => console.log('Saved todo:', todo),
    (e) => console.error('Error on saving', e)
  );