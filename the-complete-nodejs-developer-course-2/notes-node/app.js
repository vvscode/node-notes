console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const notes = require('./notes');

// let user = os.userInfo();
// console.log(user);
// fs.appendFile('greetings.txt', `Hello ${user.username}! You're ${notes.age}`;

let res = notes.addNote();

console.log(res);
console.log(notes.add(1, 45));