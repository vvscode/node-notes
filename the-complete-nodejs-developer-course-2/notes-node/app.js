console.log('Starting app.js');

const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const notes = require('./notes');

console.log(_.isString(true));
console.log(_.isString('vvscode'));
console.log(_.uniq([1, 2, 1, 3, 2, 1, 4]));