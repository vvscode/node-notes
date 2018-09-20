module.exports = (data, cb) =>
  cb(404, {
    error: 'no handler for data',
    data,
  });
