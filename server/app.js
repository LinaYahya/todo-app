const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const { join } = require('path');

const app = express();

app.disabled('x-powered-by');
app.set('port', process.env.PORT || 5000);

const middlewares = [
  compression(),
  cookieParser(),
  express.urlencoded({ extended: false }),
  express.json(),
];

app.use(middlewares);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'build')));
  app.all('*', (req, res) =>
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'))
  );
}

module.exports = app;
