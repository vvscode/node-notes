// node app.js add --title "Some title" --body "Some body"
console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = (desc = 'Title for note') => ({
  describe: desc,
  demand: true,
  alias: 't'
});

const bodyOptions = (desc = 'Body for note') => ({
  describe: desc,
  demand: true,
  alias: 'b'
});

const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions('Title of new note'),
    body: bodyOptions('Body for new note')
  })
  .command('remove', 'Remove a note', {
    title: titleOptions(),
  })
  .command('read', 'Read a note', {
    title: titleOptions(),
  })
  .command('list', 'List notes', {})
  .help()
  .argv;
const [command] = argv._;
const {
  title,
  body
} = argv;

if (command === 'add') {
  console.log('Add new note');
  notes.addNote(title, body);
  console.log(notes.readNote(title));
} else if (command === 'remove') {
  console.log('Remove note');
  notes.removeNote(title);
  console.log(notes.listNotes().join('\n'));
} else if (command === 'read') {
  console.log('Read note');
  console.log(notes.readNote(title));
} else if (command === 'list') {
  console.log('Show list');
  console.log(notes.listNotes().join('\n'));
} else {
  console.log('Enter correct command');
}