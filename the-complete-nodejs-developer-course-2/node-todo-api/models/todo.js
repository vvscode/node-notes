const { mongoose } = require('../db/mongoose');
const { ObjectID } = require('mongodb');

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

let validateTodoId = (x) => {
  if (ObjectID.isValid(x)) {
    return Promise.resolve(x);
  }
  return Promise.reject({
    message: 'Incorrect Id'
  });
}

module.exports = { Todo, validateTodoId };