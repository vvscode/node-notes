const crypto = require('crypto');
const config = require('../config');
const _data = require('./data');

const helpers = {};

/**
 * Parse string to json
 */
helpers.parseJson = str => {
  let object = {};
  try {
    object = JSON.parse(str);
  } catch (e) {
    object = false;
  }
  return object;
};

helpers.hash = str => {
  if (typeof str == 'string' && str.length > 0) {
    const hash = crypto
      .createHmac('sha256', config.hashingSecret)
      .update(str)
      .digest('hex');
    return hash;
  } else {
    return false;
  }
};

// Verify if a given token id is currently valid for a given user
helpers.verifyToken = (id, phone, callback) => {
  // Lookup the token
  _data.read('tokens', id, (err, tokenData) => {
    if (!err && tokenData) {
      // Check that the token is for the given user and has not expired
      if (tokenData.phone == phone && tokenData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

module.exports = helpers;
