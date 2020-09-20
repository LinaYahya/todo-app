const axios = require('axios');
const { sign } = require('jsonwebtoken');
require('env2')('config.env');

const loginByGoogle = async (req, res, next) => {
  try {
    const { tokenId, googleId } = req.body;
    const idInfo = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${tokenId}`
    );
    const { name } = idInfo.data;
    const token = sign({ id: googleId, name }, process.env.SECRET_KEY);
    res.cookie('token', token);
    res.end();
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    res
      .clearCookie('token')
      .json({ statusCode: 200, message: 'logout success' });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  loginByGoogle,
  logout,
};
