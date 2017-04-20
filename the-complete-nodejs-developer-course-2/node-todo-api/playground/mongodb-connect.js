const MongoClient = require('mongodb');

let lastDbConnection;

const connect = (link) => new Promise(
  (resolve, reject) => MongoClient
    .connect(link, (err, db) => err 
      ? reject('Unable to connecto to MongoDB server', err)
      : resolve(lastDbConnection = db))
);

const insertOne = (db, collectionName, data) => new Promise(
  (resolve, reject) => db.collection(collectionName)
    .insertOne(data, (err, result) => err ? reject(err) : resolve(result))
);

connect(`mongodb://localhost:27017/TodoApp`)
  .then((db) => {
    lastDbConnection = db;
    console.log('Connected to MongoDB');
    return insertOne(db, 'Todos', {
      text: `Check DB insetion at ${new Date()}`,
      done: false
    })
      .then((result) => console.log('Todo was inserted', JSON.stringify(result.ops, undefined, 2)))
      .then(() => db);
  })
  .catch(err => console.error(err))
  .then(() => lastDbConnection.close());