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
    console.log(`Address: `, JSON.stringify(body.results[0].formatted_address, undefined, 2));
    console.log(`Coordinates: `, JSON.stringify(body.results[0].geometry.location.lat), JSON.stringify(body.results[0].geometry.location.lng));
  })
  .catch((err) => console.error('Some error: ', err));