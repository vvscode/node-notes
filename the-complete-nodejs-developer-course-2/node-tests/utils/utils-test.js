const assert = require('assert');
const {
  add,
  square
} = require('./utils');

describe('Utils', function() {
  describe('#add()', function() {
    it('should return sum of arguments', function() {
      assert.equal(add(1, 2), 1 + 2);
      assert.equal(add(0, 3), 0 + 3);
      assert.equal(add(6, 6), 6 + 6);
      assert.equal(add(9, 0), 9 + 0);
      assert.equal(add(5, 1), 5 + 1);
    });
  });
  describe('#square()', function() {
    it('should return square of param', function() {
      assert.equal(square(0), 0);
      assert.equal(square(1), 1);
      assert.equal(square(2), 4);
      assert.equal(square(5), 25);
      assert.equal(square(19), 361);
    });
  });
});