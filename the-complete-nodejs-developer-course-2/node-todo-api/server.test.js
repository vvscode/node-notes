const expect = require('expect');
const request = require('supertest');

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
});