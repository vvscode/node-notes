const expect = require('expect');
const rewire = require('rewire');

const app = rewire('./app');
const db = {
  saveUser: expect.createSpy()
};
app.__set__("db", db);
const email = 'abc@dce.com';
const password = '12344321';

describe('app#handleSignup()', () => {
  it('should call the spy correctly', () => {
    app.handleSignup(email, password);
    expect(db.saveUser).toHaveBeenCalledWith({
      email,
      password
    });
  });
});