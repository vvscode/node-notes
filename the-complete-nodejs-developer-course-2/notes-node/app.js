console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');

const notes = require('./notes');

let [_nodePath, _filePath, command, ...args] = process.argv;

if (command === 'add') {
  console.log('Add new note', ...args);
} else if (command === 'remove') {
  console.log('Remove note', ...args);
} else if (command === 'list') {
  console.log('Show list', ...args);
} else {
  console.log('Enter correct command');
}