const addNote = (title, body) => {
  console.log('Add note', title, body);
};

const removeNote = (...args) => {
  console.log('removeNote', ...args);
};

const readNote = (...args) => {
  console.log('readNote', ...args);
};

const listNotes = (...args) => {
  console.log('listNotes', ...args);
};

module.exports = {
  addNote,
  readNote,
  removeNote,
  listNotes
};