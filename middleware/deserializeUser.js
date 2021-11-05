const { verifyJWT } = require('../utils/jwt.utils');

const deserializeUser = (req, res, next) => {
  const { accessToken } = req.cookies;
  console.log(req.cookies);

  if (!accessToken) return next();

  const { payload } = verifyJWT(accessToken);

  if (payload) {
    req.user = payload;
    return next();
  }

  return next();
};

module.exports = { deserializeUser };
