module.exports.add = (x, y) => x + y;

module.exports.square = x => x * x;

module.exports.asyncAdd = (x, y, cb) => setTimeout(() => cb(x + y), 1000);

module.exports.asyncSquare = (x, cb) => setTimeout(() => cb(x * x), 3000);