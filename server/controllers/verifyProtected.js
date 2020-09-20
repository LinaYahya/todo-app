const { verify } = require('jsonwebtoken');
require('env2')('config.env');

module.exports = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (token) {
      verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
          res.status(401).json('login first');
        } else {
          req.user = payload;
          next();
        }
      });
    } else {
      res.status(401).json('login first');
    }
  } catch (err) {
    next(err);
  }
};
