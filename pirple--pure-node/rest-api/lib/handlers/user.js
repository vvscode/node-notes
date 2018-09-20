const _data = require('../data');
const _helpers = require('../helpers');

const extractUserDataFromRequestInfo = data => {
  const rawPhone = data.payload.phone || (data.queryStringObject || {}).phone;
  const phone =
    typeof rawPhone == 'string' && rawPhone.trim().length == 10
      ? rawPhone.trim()
      : false;
  const firstName =
    typeof data.payload.firstName == 'string' &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;
  const lastName =
    typeof data.payload.lastName == 'string' &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;
  const password =
    typeof data.payload.password == 'string' &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;
  const tosAgreement =
    typeof data.payload.tosAgreement == 'boolean' &&
    data.payload.tosAgreement == true
      ? true
      : false;
  return {
    phone,
    firstName,
    lastName,
    password,
    tosAgreement,
    hashedPassword: _helpers.hash(password),
  };
};

const userGet = (data, cb) => {
  const { phone } = extractUserDataFromRequestInfo(data);
  if (phone) {
    // Lookup the user
    _data.read('users', phone, (err, data) => {
      if (!err && data) {
        // Remove the hashed password from the user user object before returning it to the requester
        delete data.hashedPassword;
        cb(200, data);
      } else {
        cb(404);
      }
    });
  } else {
    cb(400, { Error: 'Missing required field' });
  }
};
const userPost = (data, cb) => {
  const {
    firstName,
    lastName,
    password,
    phone,
    tosAgreement,
    hashedPassword,
  } = extractUserDataFromRequestInfo(data);

  if (firstName && lastName && phone && password && tosAgreement) {
    // Make sure the user doesnt already exist
    _data.read('users', phone, (err, data) => {
      if (err) {
        // Create the user object
        if (hashedPassword) {
          const userObject = {
            firstName,
            lastName,
            phone,
            hashedPassword,
            tosAgreement: true,
          };

          // Store the user
          _data.create('users', phone, userObject, err => {
            if (!err) {
              cb(200);
            } else {
              console.log(err);
              cb(500, { Error: 'Could not create the new user' });
            }
          });
        } else {
          cb(500, { Error: "Could not hash the user's password." });
        }
      } else {
        // User alread exists
        cb(400, {
          Error: 'A user with that phone number already exists',
        });
      }
    });
  } else {
    cb(400, {
      Error: 'Missing required fields',
      data: extractUserDataFromRequestInfo(data),
    });
  }
};
const userPut = (data, cb) => {
  const {
    firstName,
    lastName,
    password,
    phone,
  } = extractUserDataFromRequestInfo(data);

  // Error if phone is invalid
  if (phone) {
    // Error if nothing is sent to update
    if (firstName || lastName || password) {
      // Lookup the user
      _data.read('users', phone, (err, userData) => {
        if (!err && userData) {
          // Update the fields if necessary
          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.lastName = lastName;
          }
          if (password) {
            userData.hashedPassword = _helpers.hash(password);
          }
          // Store the new updates
          _data.update('users', phone, userData, err => {
            if (!err) {
              cb(200);
            } else {
              console.log(err);
              cb(500, { Error: 'Could not update the user.' });
            }
          });
        } else {
          cb(400, { Error: 'Specified user does not exist.' });
        }
      });
    } else {
      cb(400, { Error: 'Missing fields to update.' });
    }
  } else {
    cb(400, {
      Error: 'Missing required field.',
      data: extractUserDataFromRequestInfo(data),
    });
  }
};

const userDelete = (data, cb) => {
  // Check that phone number is valid
  const { phone } = extractUserDataFromRequestInfo(data);
  if (phone) {
    // Lookup the user
    _data.read('users', phone, (err, data) => {
      if (!err && data) {
        _data.delete('users', phone, err => {
          if (!err) {
            cb(200);
          } else {
            cb(500, { Error: 'Could not delete the specified user' });
          }
        });
      } else {
        cb(400, { Error: 'Could not find the specified user.' });
      }
    });
  } else {
    cb(400, { Error: 'Missing required field' });
  }
};

const userHandlers = {
  get: userGet,
  post: userPost,
  put: userPut,
  delete: userDelete,
};

module.exports = (requestInfo, cb) =>
  userHandlers[requestInfo.method](requestInfo, cb);
