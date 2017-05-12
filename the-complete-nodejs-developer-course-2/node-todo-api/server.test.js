const expect = require('expect');
const request = require('supertest');
const {
  ObjectID
} = require('mongodb');

const {
  app
} = require('./server');
let {
  Todo
} = require('./models/todo');

describe('/todos', () => {
  describe('POST', () => {
    beforeEach((done) => {
      Todo.remove({}).then(() => done());
    });

    it('should create a new todo', (done) => {
      let text = 'Test todo text';

      request(app)
        .post('/todos')
        .send({
          text
        })
        .expect(200)
        .expect((res) => expect(res.body.text).toBe(text))
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Todo.find()
            .then((todos) => {
              expect(todos.length).toBe(1);
              expect(todos[0].text).toBe(text);
              done();
            })
            .catch((err) => done(err));
        });
    });

    it('should not create todo with invalid body data', (done) => {
      let text = '';

      request(app)
        .post('/todos')
        .send({
          text
        })
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Todo.find()
            .then((todos) => expect(todos.length).toBe(0))
            .then(() => done())
            .catch((err) => done(err));
        });
    })
  });

  describe('GET', () => {
    const todos = [{
        text: 'First text todo'
      },
      {
        text: 'Second text todo'
      },
    ];
    beforeEach((done) => {
      Todo.remove({}).then(() => Todo.insertMany(todos)).then(() => done());
    });

    it('should return todos', (done) => {
      request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => expect(res.body.todos.length).toBe(todos.length))
        .end((err) => done(err))
    });
  });

  describe('/:id GET ', () => {
    let time = new Date();
    let _id = new ObjectID();
    const todo = {
      text: 'Existed todo',
      _id
    };
    beforeEach((done) => {
      Todo.remove({}).then(() => Todo.insertMany([todo])).then(() => done());
    });

    it('should return todo', (done) => {
      request(app)
        .get(`/todos/${_id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.text).toEqual(todo.text);
          expect(res.body._id).toEqual(todo._id);
        })
        .end((err) => done(err))
    });

    it('should return 404 for unknown id', (done) => {
      request(app)
        .get(`/todos/${_id.toHexString().replace(/\w/g, '0')}`)
        .expect(404)
        .end((err) => done(err))
    });


    it('should return 400 for invalid is', (done) => {
      request(app)
        .get(`/todos/1234`)
        .expect(400)
        .end((err) => done(err))
    });
  });

  describe('/:id DELETE ', () => {
    let time = new Date();
    let _id = new ObjectID();
    const todo = {
      text: 'Existed todo',
      _id
    };
    beforeEach((done) => {
      Todo.remove({}).then(() => Todo.insertMany([todo])).then(() => done());
    });

    it('should remove todo and return removed todo', (done) => {
      request(app)
        .delete(`/todos/${_id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.text).toEqual(todo.text);
          expect(res.body._id).toEqual(todo._id);
        })
        .end((err) => {
          if (err) {
            done(err);
          }
          Todo.find()
            .then((todos) => {
              expect(todos.length).toBe(0);
              done();
            })
            .catch((err) => done(err));
        });
    });

    it('should return 404 for non-existing id', (done) => {
      request(app)
        .delete(`/todos/${_id.toHexString().replace(/\w/g, '0')}`)
        .expect(404)
        .end((err) => done(err))
    });


    it('should return 400 for invalid id', (done) => {
      request(app)
        .delete(`/todos/1234`)
        .expect(400)
        .end((err) => done(err))
    });
  });
});