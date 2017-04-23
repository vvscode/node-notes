const {
  MongoClient,
  ObjectID
} = require('mongodb');

let lastDbConnection;

const connect = (link) => new Promise(
  (resolve, reject) => MongoClient
  .connect(link, (err, db) => err ?
    reject('Unable to connecto to MongoDB server', err) :
    resolve(lastDbConnection = db))
);

const insertOne = (db, collectionName, data) => new Promise(
  (resolve, reject) => db.collection(collectionName)
  .insertOne(data, (err, result) => err ? reject(err) : resolve(result))
);

const find = (db, collectionName, filter = {}) => db.collection(collectionName).find(filter);

const deleteMany = (db, collectionName, filter = {}) => db.collection(collectionName).deleteMany(filter);

const deleteOne = (db, collectionName, filter = {}) => db.collection(collectionName).deleteOne(filter);

/* Returns remove item, so we can return it back */
const findOneAndDelete = (db, collectionName, filter = {}) => db.collection(collectionName).findOneAndDelete(filter);

const findOneAndUpdateOne = (db, collectionName, filter, updateOperator) => db.collection(collectionName).findOneAndUpdate(filter, updateOperator);

connect(`mongodb://localhost:27017/TodoApp`)
  .then((db) => {
    lastDbConnection = db;
    console.log('Connected to MongoDB');
    console.log('----- insertOne');
    return insertOne(db, 'Todos', {
        text: `Check DB insetion at ${new Date()}`,
        done: true
      })
      .then((result) => console.log('Todo was inserted', JSON.stringify(result.ops, undefined, 2)))
      .then(() => console.log('----- find'))
      .then(() => find(db, 'Todos', {
        _id: new ObjectID('58f916c651768944c5035b1a')
      }).toArray())
      .then((data) => console.log(JSON.stringify(data, undefined, 2)))
      .then(() => console.log('----- deleteMany'))
      .then(() => deleteMany(db, 'Todos', {
        _id: new ObjectID('58f916c651768944c5035b1a')
      }))
      .then(() => console.log('----- find'))
      .then(() => find(db, 'Todos', {
        _id: new ObjectID('58f916c651768944c5035b1a')
      }).count())
      .then(() => insertOne(db, 'Todos', {
        text: `Check DB insetion at ${new Date()}`,
        done: true,
        customId: 3,
      }))
      .then(() => findOneAndUpdateOne(db, 'Todos', {
        customId: 3
      }, {
        $set: {
          done: false,
          addSome: 'data'
        }
      }))
      .then(() => find(db, 'Todos', { customId: 3 }).toArray())
      .then((data) => console.log(JSON.stringify(data, undefined, 2)));
  })
  .catch(err => console.error(err))
  .then(() => lastDbConnection.close());