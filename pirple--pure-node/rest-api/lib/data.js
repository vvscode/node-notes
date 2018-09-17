/**
 * For storing and editing data
 */
// Deps
const fs = require('fs');
const path = require('path');

// Container of the module
const lib = {};

// Base directory path
lib.baseDir = path.join(__dirname, '/../.data');

/**
 * Create new file
 * @param {*} dir
 * @param {*} fileName
 * @param {*} data
 * @param {*} cb
 */
lib.create = (dir, fileName, data, cb) => {
  const fullFileName = `${lib.baseDir}/${dir}/${fileName}.json`;
  // open for writing
  fs.open(fullFileName, 'wx', (err, fp) => {
    if (!err && fp) {
      const stringData = JSON.stringify(data, null, 2);
      fs.writeFile(fp, stringData, err => {
        if (!err) {
          fs.close(fp, err => {
            if (!err) {
              cb(false);
            } else {
              cb('Can not close file');
            }
          });
        } else {
          cb(`Error writing to file ${fullFileName}`);
        }
      });
    } else {
      cb(`Could not create file ${fullFileName}`);
    }
  });
};

/**
 * Read data from file
 * @param {*} dir
 * @param {*} fileName
 * @param {*} cb
 */
lib.read = (dir, fileName, cb) => {
  const fullFileName = `${lib.baseDir}/${dir}/${fileName}.json`;
  fs.readFile(fullFileName, cb);
};

lib.update = (dir, fileName, data, cb) => {
  const fullFileName = `${lib.baseDir}/${dir}/${fileName}.json`;
  // open for writing
  fs.open(fullFileName, 'r+', (err, fp) => {
    if (!err && fp) {
      const stringData = JSON.stringify(data, null, 2);

      fs.ftruncate(fp, err => {
        if (err) {
          return cb('Can not truncate file');
        }
        fs.writeFile(fp, stringData, err => {
          if (!err) {
            fs.close(fp, err => {
              if (!err) {
                cb(false);
              } else {
                cb('Can not close file');
              }
            });
          } else {
            cb(`Error writing to file ${fullFileName}`);
          }
        });
      });
    } else {
      cb(`Could not open file ${fullFileName}`);
    }
  });
};

lib.delete = (dir, fileName, cb) => {
  const fullFileName = `${lib.baseDir}/${dir}/${fileName}.json`;
  fs.unlink(fullFileName, cb);
};

// Export module
module.exports = lib;
