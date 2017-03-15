const fs = require('fs');

const NOTES_FILE = 'notes.json';

const addNote = (title, body) => {
  console.log('Add note', title, body);
  let notes = [];
  let note = { title, body };

  notes.push(note);
  fs.writeFileSync(NOTES_FILE, JSON.stringify(notes));
};

const removeNote = (title) => {
  console.log('removeNote', title);
};

const readNote = (title) => {
  console.log('readNote', title);
};

const listNotes = () => {
  console.log('listNotes');
};

module.exports = {
  addNote,
  readNote,
  removeNote,
  listNotes
};