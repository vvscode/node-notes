const mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;
// Connection settings
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
};
