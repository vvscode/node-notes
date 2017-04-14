const expect = require('expect');
const {
  add,
  square,
  asyncAdd,
  asyncSquare
} = require('./utils');

describe('Utils', function () {
  describe('#add()', function () {
    it('should return sum of arguments', function () {
      expect(add(1, 2)).toBe(1 + 2);
      expect(add(0, 3)).toBe(0 + 3);
      expect(add(6, 6)).toBe(6 + 6);
      expect(add(9, 0)).toBe(9 + 0);
      expect(add(5, 1)).toBe(5 + 1);
    });
  });

  describe('#square()', function () {
    it('should return square of param', function () {
      expect(square(0)).toBe(0);
      expect(square(1)).toBe(1);
      expect(square(2)).toBe(4);
      expect(square(5)).toBe(25);
      expect(square(19)).toBe(361);
    });
  });

  describe('#asyncAdd()', function () {
    it('should call cb with sum of params', function (done) {
      asyncAdd(1, 2, (ret) => expect(ret).toBe(1 + 2) && done());
    });
  });

    describe('#asyncSquare()', function () {
    it('should call cb with square of param', function (done) {
      asyncSquare(3, (ret) => expect(ret).toBe(3*3) && done());
    });
  });
});