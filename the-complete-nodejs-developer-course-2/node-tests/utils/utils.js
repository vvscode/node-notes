module.exports.add = (x, y) => x + y;

module.exports.square = x => x * x;

module.exports.asyncAdd = (x, y, cb) => setTimeout(() => cb(x + y), 1000);