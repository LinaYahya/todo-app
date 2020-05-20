// const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');
const { sign } = require('jsonwebtoken');
require('env2')('config.env');

// const { CLIENT_ID } = process.env;
// const client = new OAuth2Client(CLIENT_ID);

module.exports = async (req, res, next) => {
  const { tokenId, googleId } = req.body;

  const token = sign({ id: googleId }, process.env.SECRET_KEY);
  res.cookie('token', token);

  const idInfo = await axios.get(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${tokenId}`
  );
  const { name } = idInfo.data;

  res.end();
  // verify().catch(console.error);
};
