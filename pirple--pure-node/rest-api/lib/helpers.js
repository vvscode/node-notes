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

module.exports = helpers;
