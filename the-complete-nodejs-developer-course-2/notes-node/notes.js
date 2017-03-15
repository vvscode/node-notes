const fs = require('fs');
const _ = require('lodash');

const NOTES_FILE = 'notes.json';

const addNote = (title, body) => {
  console.log('Add note', title, body);
  let notes = [];
  try {
    let tmpNotes = fs.readFileSync(NOTES_FILE);
    notes = JSON.parse(tmpNotes);
  } catch (e) { }
  
  const sameNote = _.find(notes, { title });
  if (sameNote) {
    sameNote.body = body;
  } else {
    notes.push({ title, body });
  }

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