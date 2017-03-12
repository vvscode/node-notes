const addNote = (title, body) => {
  console.log('Add note', title, body);
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