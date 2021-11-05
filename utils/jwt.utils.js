const jwt = require('jsonwebtoken');

const secret = process.env.JWT_KEY;

//sign jwt
export function signJWT(payload, expiresIn) {
  return jwt.sign(payload, secret);
}

//verify jwt
export function verifyJWT(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return { payload: decoded, expired: false };
  } catch (error) {
    return { payload: null, expired: error.message.include('jwt expired') };
  }
}
