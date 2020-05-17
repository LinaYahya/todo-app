const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const { join } = require('path');
const connection = require('./database/connection');

const app = express();
const router = require('./router');

app.disabled('x-powered-by');
app.set('port', process.env.PORT || 5000);

const middlewares = [
  compression(),
  cookieParser(),
  express.urlencoded({ extended: false }),
  express.json(),
];

app.use(middlewares);
app.use('/api/v1', router);

connection
  .on('open', () => console.log('mongo database is connected'))
  .on('error', () => process.exit(1));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'build')));
  app.all('*', (req, res) =>
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'))
  );
}

module.exports = app;
