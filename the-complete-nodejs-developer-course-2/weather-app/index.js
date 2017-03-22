const request = require('request');

const address = `3й Железнодорожный переулок 15`;
const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`;

request.get({
  url,
  json: true
}, (err, response, body) => {
  console.log(body);
});