const jwt = require('jsonwebtoken');

const secret = process.env.JWT_KEY;

//sign jwt
const signJWT = (payload, expiresIn) => {
  return jwt.sign(payload, secret);
};

//verify jwt
const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    return { payload: decoded, expired: false };
  } catch (error) {
    return { payload: null, expired: error.message.include('jwt expired') };
  }
};

module.exports = {
  signJWT,
  verifyJWT,
};
