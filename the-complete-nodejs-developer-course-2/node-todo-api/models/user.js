const {
  mongoose
} = require('../db/mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const pick = require('lodash/pick');
const JWT_SALT = 'abc123';

const UserSchema = new mongoose.Schema({
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

UserSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, JWT_SALT).toString();

  user.tokens.push({ access, token });
  return user.save().then(() => token);
};

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();
  return pick(userObject, ['_id', 'email']);
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, JWT_SALT);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

// {
//   email: 'some@mail.ru',
//   password: '12342135',
//   tokens: [
//     { access: 'phone', token: 'some token' },
//     { access: 'home', token: 'some another token' }
//   ]
// }
let User = mongoose.model('User', UserSchema);

module.exports = {
  User
};