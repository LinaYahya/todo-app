// const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');
const { sign } = require('jsonwebtoken');
require('env2')('config.env');

// const { CLIENT_ID } = process.env;
// const client = new OAuth2Client(CLIENT_ID);

module.exports = async (req, res) => {
  const { tokenId, googleId } = req.body;
  const idInfo = await axios.get(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${tokenId}`
  );
  const { name } = idInfo.data;

  const token = sign({ id: googleId, name }, process.env.SECRET_KEY);
  res.cookie('token', token);

  res.end();
};
