module.exports = (data, cb) =>
  cb(406, { name: `sample handler for ${JSON.stringify(data, null, 2)}` });
