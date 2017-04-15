const request = require('supertest');
const app = require('./server').app;

describe('GET /', function () {
  it('respond with html', function(done) {
    request(app)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /text\/html/)
      .expect('Hello world!')
      .expect(200, done);
  });
});

describe('GET /user', function () {
  it('respond with json', function(done) {
    request(app)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect(200, {
        user: 'me',
        name: 'VvsCode',
        params: [10, 20, 30]
      }, done);
  });
});