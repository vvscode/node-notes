let db = require('./db');

module.exports.handleSignup = (email, password) => {
  // check if emails already used
  // save user to db
  db.saveUser({
    email,
    password
  });
  // send welcome email
};