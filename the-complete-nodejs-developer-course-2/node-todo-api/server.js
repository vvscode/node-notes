const { mongoose } = require('./db/mongoose');
const User = require('./models/user');
const Todo = require('./models/todo');

(new User({
  email: 'some@email',
  // completed: true,
  // completedAt: Date.now()
})).save()
  .then(
    (todo) => console.log('Saved todo:', todo),
    (e) => console.error('Error on saving', e)
  );