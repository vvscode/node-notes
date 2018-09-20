/**
 * For storing and editing data
 */
// Deps
const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');

// Container of the module
const lib = {};

// Base directory path
lib.baseDir = path.join(__dirname, '/../.data');
const getFullName = (dir, fileName) => `${lib.baseDir}/${dir}/${fileName}.json`;

/**
 * Create new file
 * @param {*} dir
 * @param {*} fileName
 * @param {*} data
 * @param {*} cb
 */
lib.create = (dir, fileName, data, cb) => {
  // open for writing
  const fullFileName = getFullName(dir, fileName);

  fs.open(fullFileName, 'wx', (err, fp) => {
    if (err || !fp) {
      cb(`Error opening to file ${fullFileName}`);
    }
    const stringData = JSON.stringify(data, null, 2);
    fs.writeFile(fp, stringData, err => {
      if (err) {
      }
      fs.close(fp, err => {
        err ? cb(`Error closing to file ${fullFileName}`) : cb(false);
      });
    });
  });
};

/**
 * Read data from file
 * @param {*} dir
 * @param {*} fileName
 * @param {*} cb
 */
lib.read = (dir, fileName, cb) =>
  fs.readFile(getFullName(dir, fileName), (err, data) => {
    if (err) {
      return cb(err);
    }
    return cb(helpers.parseJson(data));
  });

lib.update = (dir, fileName, data, cb) => {
  // open for writing
  const fullFileName = getFullName(dir, fileName);
  fs.open(fullFileName, 'r+', (err, fp) => {
    if (err || !fp) {
      return cb(`Could not open file ${fullFileName}`);
    }

    const stringData = JSON.stringify(data, null, 2);
    fs.ftruncate(fp, err => {
      if (err) {
        return cb('Can not truncate file');
      }
      fs.writeFile(fp, stringData, err => {
        if (err) {
          return cb(`Error writing to file ${fullFileName}`);
        }
        fs.close(fp, err => {
          err ? cb(`Error closing to file ${fullFileName}`) : cb(false);
        });
      });
    });
  });
};

/**
 * Delete existing file
 * @param {*} dir
 * @param {*} fileName
 * @param {*} cb
 */
lib.delete = (dir, fileName, cb) => fs.unlink(getFullName(dir, fileName), cb);

// Export module
module.exports = lib;
