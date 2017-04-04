const FORECAST_API_KEY = `d113af5f82393ef553f48314ae9f42e8`;
const FORECAST_LANG = `ru`;

const request = require('request');
const promisify = require("es6-promisify");
const get = promisify(request.get);

module.exports = ({ lat, lng }) => {
  const url = `https://api.darksky.net/forecast/${FORECAST_API_KEY}/${lat},${lng}?lang=${FORECAST_LANG}`;
  // console.log(url);
  return get({
    url,
    json: true
  });
};