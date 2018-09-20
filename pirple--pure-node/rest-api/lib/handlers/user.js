const userGet = (requestInfo, cb) => cb(200, '/get user');
const userPost = (requestInfo, cb) => cb(200, '/post user');
const userPut = (requestInfo, cb) => cb(200, '/put user');
const userDelete = (requestInfo, cb) => cb(200, '/delete user');

const userHandlers = {
  get: userGet,
  post: userPost,
  put: userPut,
  delete: userDelete,
};

module.exports = (requestInfo, cb) =>
  userHandlers[requestInfo.method](requestInfo, cb);
