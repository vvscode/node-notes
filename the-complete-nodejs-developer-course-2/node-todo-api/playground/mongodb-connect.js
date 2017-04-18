const MongoClient = require('mongodb');

MongoClient
  .connect(`mongodb://localhost:27017/TodoApp`, (err, db) => {
    if (err) {
      return console.log('Unable to connecto to MongoDB server', err);
    }
    console.log('Connected to MongoDB');
    db.close();
  });