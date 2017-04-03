const util = require('util');
const yargs = require('yargs');
const getLocationInfo = require('./utils/location');

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
  getLocationInfo(address)
  .then(({
    results: [{
      formatted_address,
      geometry
    }]
  }) => {
    console.log(`Address: `, JSON.stringify(formatted_address, undefined, 2));
    console.log(`Coordinates: `, JSON.stringify(geometry.location.lat), JSON.stringify(geometry.location.lng));
  })
  .catch((err) => console.error('Some error: ', err));