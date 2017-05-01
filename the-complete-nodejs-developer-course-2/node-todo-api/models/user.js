const { mongoose } = require('../db/mongoose');

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

module.exports = { User };