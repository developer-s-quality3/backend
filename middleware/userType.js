const userType = (type) => {
  return function (req, res, next) {
    if (req.user.userType !== type) {
      return res
        .status(403)
        .send({ success: false, message: 'user Type invalid' });
    }

    return next();
  };
};

module.exports = {
  userType,
};
