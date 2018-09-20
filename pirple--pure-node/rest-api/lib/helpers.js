const crypto = require('crypto');
var config = require('../config');

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

module.exports = helpers;
