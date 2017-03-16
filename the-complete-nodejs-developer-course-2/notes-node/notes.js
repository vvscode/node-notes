const fs = require('fs');
const _ = require('lodash');

const NOTES_FILE = 'notes.json';

const fetchNotes = () => {
  try {
    let tmpNotes = fs.readFileSync(NOTES_FILE);
    return JSON.parse(tmpNotes);
  } catch (e) { return []; }
};

const saveNotes = (notes) => fs.writeFileSync(NOTES_FILE, JSON.stringify(notes));

const addNote = (title, body) => {
  let notes = fetchNotes();
  
  const sameNote = _.find(notes, { title });
  if (sameNote) {
    sameNote.body = body;
  } else {
    notes.push({ title, body });
  }
  saveNotes(notes);
};

const removeNote = (title) => saveNotes(fetchNotes().filter(item => item.title !== title));

const readNote = (title) => fetchNotes().find(item => item.title === title);

const listNotes = () => fetchNotes().map(({ title }) => title);

module.exports = {
  addNote,
  readNote,
  removeNote,
  listNotes
};