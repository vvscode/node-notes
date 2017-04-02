const request = require('request');
const util = require('util');
const yargs = require('yargs');
const promisify = require("es6-promisify");

const get = promisify(request.get);

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Adress to fetch weather for',
      string: true
    }
  })
  .help()
  .argv;

const address = argv.a;
const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`;

get({
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
  })
  .then(({
    results: [{
      formatted_address,
      geometry
    }],
    status
  }) => {
    console.log(`Address: `, JSON.stringify(formatted_address, undefined, 2));
    console.log(`Coordinates: `, JSON.stringify(geometry.location.lat), JSON.stringify(geometry.location.lng));
  })
  .catch((err) => console.error('Some error: ', err));