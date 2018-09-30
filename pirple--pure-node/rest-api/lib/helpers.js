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

// Create a string of random alphanumeric characters, of a given length
const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
// Get a random charactert from the possibleCharacters string
const getRandomCharacter = _ =>
  possibleCharacters.charAt(
    Math.floor(Math.random() * possibleCharacters.length),
  );
helpers.createRandomString = strLength => {
  strLength = typeof strLength == 'number' && strLength > 0 ? strLength : false;
  if (strLength) {
    // Define all the possible characters that could go into a string

    // Start the final string
    let str = '';
    for (i = 1; i <= strLength; i++) {
      // Append this character to the string
      str += getRandomCharacter();
    }
    // Return the final string
    return str;
  } else {
    return false;
  }
};

module.exports = helpers;
