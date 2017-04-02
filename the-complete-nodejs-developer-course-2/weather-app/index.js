const request = require('request');
const util = require('util');
const yargs = require('yargs');

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

request.get({
  url,
  json: true
}, (err, response, body) => {
  console.log(`Address: `, JSON.stringify(body.results[0].formatted_address, undefined, 2));
  console.log(`Coordinates: `, JSON.stringify(body.results[0].geometry.location.lat), JSON.stringify(body.results[0].geometry.location.lng));
});