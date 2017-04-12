const assert = require('assert');
const {
  add
} = require('./utils');

describe('Utils', function() {
  describe('#add()', function() {
    it('should return sum of arguments', function() {
      assert.equal(add(1, 2), 1 + 2);
    });
  });
});