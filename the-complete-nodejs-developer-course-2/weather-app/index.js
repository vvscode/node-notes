const util = require('util');
const yargs = require('yargs');
const getLocationInfo = require('./utils/location');
const getForecast = require('./utils/forecast');

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
      console.log(formatted_address);  
      console.log(geometry.location);  
      return getForecast(geometry.location);
    })
  .then(({body}) => console.log(require('util').inspect(body.daily.summary)))
  .catch((err) => console.error('Some error: ', err));