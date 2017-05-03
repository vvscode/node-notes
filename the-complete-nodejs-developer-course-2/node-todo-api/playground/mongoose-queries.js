const {mongoose} = require('../db/mongoose');
const {Todo} = require('../models/todo');


let id = `5907f2a5cae1bb504c6e5a2f`;

Todo.find({
  _id: id
}).then((todos) => console.log('Todos', todos));