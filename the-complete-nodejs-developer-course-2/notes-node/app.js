console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv = yargs.argv;

console.log('Yargs:', yargs.argv);
let [_nodePath, _filePath, command, ...args] = process.argv;

if (command === 'add') {
  console.log('Add new note', ...args);
  notes.addNote(argv.title, argv.body);
} else if (command === 'remove') {
  console.log('Remove note', ...args);
  notes.removeNote(argv.title, argv.body);
} else if (command === 'read') {
  console.log('Read note', ...args);
  notes.readNote(argv.title, argv.body);
} else if (command === 'list') {
  console.log('Show list', ...args);
  notes.listNotes();
} else {
  console.log('Enter correct command');
}