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