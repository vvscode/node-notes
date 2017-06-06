// const {
//   SHA256
// } = require('crypto-js');

// var message = 'I am user #3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}
// Hash: ${hash}`);

const jwt = require('jsonwebtoken');
const SECRET = '123abc';

var data = {
  id: 10
};

const token = jwt.sign(data, SECRET).toString();
const brokenToken = token.replace(/e/, '0')

console.log(token, jwt.verify(token, SECRET));
console.log(brokenToken, jwt.verify(brokenToken, SECRET));