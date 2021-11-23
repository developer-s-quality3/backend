const { getSession } = require("../db/session");
const { User } = require("../models");
const { verifyJWT, signJWT } = require("../utils/jwt.utils");

const deserializeUser = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) return next();

  const { payload, expired } = verifyJWT(accessToken);
  // console.log(payload);
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

  const session = await getSession(refresh.sessionId);

  if (!session) {
    return next();
  }

  const user = await User.findOne({ where: { email: session.email } });

  const newAccessToken = signJWT(
    {
      sessionId: session.id,
      userId: user.id,
      email: user.email,
      name: user.name,
      userType: user.userType,
    },
    "30m"
  );

  res.cookie("accessToken", newAccessToken, {
    maxAge: 2.16e7, // 6 hours
    httpOnly: false,
  });

  req.user = verifyJWT(newAccessToken).payload;

  return next();
};

module.exports = { deserializeUser };
