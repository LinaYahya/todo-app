const mongoose = require('mongoose');

require('env2')('config.env');

const dburl = process.env.DB_URL;

mongoose
  .connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('database connection successful'))
  .catch((err) => console.log(err));

module.exports = mongoose.connection;
