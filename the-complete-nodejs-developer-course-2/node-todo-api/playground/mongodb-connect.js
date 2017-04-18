const MongoClient = require('mongodb');

MongoClient
  .connect(`mongodb://localhost:27017/TodoApp`, (err, db) => {
    if (err) {
      return console.log('Unable to connecto to MongoDB server', err);
    }
    console.log('Connected to MongoDB');

    db.collection('Todos').insertOne({
      text: `Check DB insetion at ${new Date()}`
    }, (err, result) => {
      if (err) {
        return console.log('Error on inserting todo', err);
      }
      console.log('Todo was inserted', JSON.stringify(result.ops, undefined, 2));
      db.close();
    });
  });