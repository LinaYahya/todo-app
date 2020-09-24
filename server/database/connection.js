const mongoose = require('mongoose');

require('env2')('config.env');

let dbUrl;
switch (process.env.NODE_ENV) {
  case 'production':
    dbUrl = process.env.MONGO_URI;
    break;
  case 'development':
    dbUrl = process.env.DB_URL;
    break;

  default:
    throw new Error('No Database URL!!!');
}

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('database connection successful'))
  .catch((err) => console.log(err));

module.exports = mongoose.connection;
