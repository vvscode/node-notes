const { mongoose } = require('../db/mongoose');
const validator = require('validator');

// {
//   email: 'some@mail.ru',
//   password: '12342135',
//   tokens: [
//     { access: 'phone', token: 'some token' },
//     { access: 'home', token: 'some another token' }
//   ]
// }
let User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} should be valid email',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
});

module.exports = { User };