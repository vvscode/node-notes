const assert = require('assert');
const {
  add
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
});