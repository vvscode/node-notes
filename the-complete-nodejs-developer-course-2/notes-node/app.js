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

yargs
  .command(
    'add',
    'Add a new note', {
      title: titleOptions('Title of new note'),
      body: bodyOptions('Body for new note')
    },
    ({
      title,
      body
    }) => {
      notes.addNote(title, body);
      console.log(notes.readNote(title));
    })
  .command(
    'remove',
    'Remove a note', {
      title: titleOptions(),
    },
    ({
      title
    }) => {
      notes.removeNote(title);
      console.log(notes.listNotes().join('\n'));
    })
  .command(
    'read',
    'Read a note', {
      title: titleOptions(),
    },
    ({
      title
    }) => {
      console.log(notes.readNote(title));
    })
  .command(
    'list',
    'List notes', {},
    () => {
      console.log(notes.listNotes().join('\n'));
    }
  )
  .help()
  .argv;