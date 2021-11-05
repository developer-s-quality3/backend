const { verifyJWT } = require('../utils/jwt.utils');

const deserializeUser = (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;
  console.log(req.cookies);

  if (!accessToken) return next();

  const { payload, expired } = verifyJWT(accessToken);

  // for a valid access token
  if (payload) {
    req.user = payload;
    return next();
  }

  // expired but valid access token
  const { payload: refresh } =
    expired && refreshToken ? verifyJWT(refreshToken) : { payload: null };

  if (!refresh) {
    return next();
  }

  return next();
};

module.exports = { deserializeUser };
