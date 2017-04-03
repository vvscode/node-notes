const request = require('request');
const promisify = require("es6-promisify");

const get = promisify(request.get);

module.exports = (address) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`;
  return get({
    url,
    json: true
  })
    .then(({
    body
  }) => {
      // handle error from google api
      if (body.status !== 'OK') {
        throw Error('No matches found');
      }
      return body;
    });
}